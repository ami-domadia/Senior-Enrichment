const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/campus';

const orm = new Sequelize(DATABASE_URL, {logging: false});

const Campus = orm.define('campus', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
    },
    imageUrl: {
        type: Sequelize.TEXT,
        defaultValue: 'https://images.pottermore.com/bxd3o8b291gf/4j6x7iMI88aicYasciiMsm/c581d5f9a424f664cd6f19dbb4c5dee0/HogwartsCastle_WB_F5_HogwartsCastleIllustration_Illust_080615_Land.jpg?w=400'
    },
    address: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
    },
    description: {
        type: Sequelize.BLOB,
    }
});

const Student = orm.define('student', {
    firstName: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
    },
    lastName: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
    },
    email: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
        validate: {
            isEmail: true,     
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        defaultValue: 'https://www.collectgbstamps.co.uk/images/gb/2018/2018_9517.jpg'
    },
    gpa: {
        type: Sequelize.DECIMAL(10, 1),
        validate: {
            isDecimal: true,
            max: 4.0,
            min: 0.0,
        }
    }
});

Student.belongsTo(Campus);

const syncAndSeed = ()=>{
    return orm.sync({force: true})
    .then(()=> Promise.all([Campus.create({id: 1, name: 'Hogwarts School of Witchcraft and Wizardry', address: 'Scotland'}),
    Campus.create({id: 2, name:'Beauxbatons Academy of Magic', address: 'France', imageUrl: 'https://images.pottermore.com/bxd3o8b291gf/3hvlBgnk2QmqU4YaUwG2cu/7d852f3991e6d53407d3c70a12efb314/Wizarding-School-Map-Beauxbatons.jpg?w=400'}),
    Campus.create({id: 3, name:'Durmstrang Institute', address: 'Belgium', imageUrl: 'https://images.pottermore.com/bxd3o8b291gf/7m6Tr6KIhOkWGwgim2AyUi/6cdf6741be2ef6d77896c5cac7743555/Wizarding-School-Map-Durmstrang.jpg?w=400'}),
    Campus.create({id: 4, name:'Cal', address: 'USA', imageUrl: 'https://media.ussportscamps.com/media/legacy/UC_Berkeley_Campus.jpg'}),
    Student.create({id: 11, firstName: 'Hermione', lastName: 'Granger', email: 'granger@hogwarts.com', gpa: 4.0}),
    Student.create({id: 12, firstName: 'Harry', lastName: 'Potter', email: 'potter@hogwarts.com', gpa: 3.0, imageUrl: 'https://www.collectgbstamps.co.uk/images/gb/2018/2018_9519.jpg'}),
    Student.create({id: 13, firstName: 'Ron', lastName: 'Weasley', email: 'weasley@hogwarts.com', gpa: 2.9, imageUrl: 'https://www.collectgbstamps.co.uk/images/gb/2018/2018_9521.jpg'}),
    Student.create({id: 14, firstName: 'Fleur', lastName: 'Delacour', email: 'delacour@beauxbatons.com', gpa: 3.6}),
    Student.create({id: 15, firstName: 'Viktor', lastName: 'Krum', email: 'krum@durmstrang.com', gpa: 3.0}),
    Student.create({id: 16, firstName: 'Matias', lastName: 'Poliakoff', email: 'poliakoff@durmstrang.com', gpa: 2.0}),
    Student.create({id: 17, firstName: 'Gabrielle', lastName: 'Delacour', email: 'g.delacour@beauxbatons.com', gpa: 4.0}),
    Student.create({id: 18, firstName: 'Ginny', lastName: 'Weasley', email: 'g.weasley@hogwarts.com', gpa: 3.5, imageUrl: 'https://www.collectgbstamps.co.uk/images/gb/2018/2018_9523.jpg'}),
    Student.create({id: 19, firstName: 'Draco', lastName: 'Malfoy', email: 'malfoy@hogwarts.com', gpa: 4.0}),
    Student.create({id: 20, firstName: 'Annie', lastName: 'Liebowitz', email: 'liebowitz@berkeley.edu', gpa: 2.0})

        ]))
    .then((array)=>{
        array.filter(item=>item.id>10 && item.email.includes('hogwarts'))
                        .forEach(student=>student.setCampus(array[0]));
        array.filter(item=>item.id>10 && item.email.includes('beauxbatons'))
                        .forEach(student=>student.setCampus(array[1]));
        array.filter(item=>item.id>10 && item.email.includes('durmstrang'))
                        .forEach(student=>student.setCampus(array[2]));
    })
    .catch((err)=>console.log(err))
}

module.exports = {syncAndSeed, Campus, Student}
