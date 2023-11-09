const express =require("express");
const UserModel = require("../models/").User;
const EmployeeModel = require("../models").Employee;
const TrainingModel = require("../models/").Training;
const CompensationModel = require("../models/").Compensation;
const EducationModel = require("../models/").Education;
const ExperiencesModel = require("../models/").Experiences;
const PerformancesModel = require("../models/").Performances;
const LeavesModel = require("../models/").Leaves;
const jwtMiddleware = require("../config/jwt-middleware");
// const JWT = require("jsonwebtoken");
// const jwtConfig = require("../config/jwt-config");
// const {route} = require("express/lib/application");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const router = express();
const sequelize = require("../config/config.json")

// config db
// const sequelize = new Sequelize('hcm_final', 'root', 'kuku', {
//     host: 'localhost',
//     dialect: 'mysql'
// });



//let role = req.data.role;
//jwtMiddleware.checkToken, - removed middleware

// GET - View All users for role:admin, view all users and view mod by id and view user by id
 router.get("/dashboard", jwtMiddleware.checkToken, async (req, res) => {
    const role = req.data.role;
    const userId = req.data.id;

    // const role = 'admin';
    // const userId = 4;

    async function getUsersByRole(role, userId) {
        try {
            let users;
            if (role === 'admin') {
                users = await UserModel.findAll(
                    {
                    attributes:["id","email","status","role"],//on Users table
                        include: [
                            {
                                model: EmployeeModel,
                                attributes: ["id","firstName","surName","lastName","dateOfBirth","gender","address","phoneNo"],
                            },
                            {
                                model: ExperiencesModel,
                                attributes: ["id","company","position","start_date_exp","end_date_exp"],
                            },
                            {
                                model: LeavesModel,
                                attributes:["id","type","status_lea","start_date_lea","end_date_lea"],
                            },
                            {
                                model: CompensationModel,
                                attributes:["id","salary","currency","bonuses"],
                            },
                            {
                                model: EducationModel,
                                attributes:["id","degree","institution","start_date_edu","end_date_edu"],
                            },
                            {
                                model: PerformancesModel,
                                attributes:["id","performance_score","comments","review_date"],
                            },
                            {
                                model: TrainingModel,
                                attributes:["id","training_name","training_date","trainer"],
                            },
                        ],
                    },
                );
            } else if (role === 'mod') {
                // For role mod and user
                users = await UserModel.findAll(


                    {
                        attributes:["id","email","status","role"],//on Users table
                        include: [
                            {
                                model: EmployeeModel,
                                attributes: ["firstName","surName","lastName","dateOfBirth","gender","address","phoneNo"],
                            },
                            {
                                model: ExperiencesModel,
                                attributes: ["company","position","start_date_exp","end_date_exp"],
                            },
                            {
                                model: LeavesModel,
                                attributes:["type","status_lea","start_date_lea","end_date_lea"],
                            },
                            {
                                model: CompensationModel,
                                attributes:["salary","currency","bonuses"],
                            },
                            {
                                model: EducationModel,
                                attributes:["degree","institution","start_date_edu","end_date_edu"],
                            },
                            {
                                model: PerformancesModel,
                                attributes:["performance_score","comments","review_date"],
                            },
                            {
                                model: TrainingModel,
                                attributes:["training_name","training_date","trainer"],
                            },
                        ],
                    where: {
                        [Op.or]: [
                            { role: 'mod', id: userId },
                            { role: 'user' },
                        ],
                    }
                });
            } else if (role === 'user') {
                users = await UserModel.findAll(

                {
                    attributes:["id","email","status","role"],//on Users table
                        include: [
                    {
                        model: EmployeeModel,
                        attributes: ["firstName","surName","lastName","dateOfBirth","gender","address","phoneNo"],
                    },
                    {
                        model: ExperiencesModel,
                        attributes: ["company","position","start_date_exp","end_date_exp"],
                    },
                    {
                        model: LeavesModel,
                        attributes:["type","status_lea","start_date_lea","end_date_lea"],
                    },
                    {
                        model: CompensationModel,
                        attributes:["salary","currency","bonuses"],
                    },
                    {
                        model: EducationModel,
                        attributes:["degree","institution","start_date_edu","end_date_edu"],
                    },
                    {
                        model: PerformancesModel,
                        attributes:["performance_score","comments","review_date"],
                    },
                    {
                        model: TrainingModel,
                        attributes:["training_name","training_date","trainer"],
                    },
                ],

                    where: {
                        id: userId,
                    },

                });
            }
            return users;
        } catch (error) {
            console.error('Error retrieving users: ', error);
            throw error;
        }
    }

    try {
        const result = await getUsersByRole(role, userId);

        if (result) {
            res.status(200).json({
                status: true,
                message: `${role} role found`,
                data: result
            });
        } else {
            res.status(500).json({
                status: false,
                message: "Not found users"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error retrieving users"
        });
    }
});

// GET - View by id users for role:admin, view all users and view mod by id and view user by id
router.get("/dashboard-view/:id", jwtMiddleware.checkToken, async (req, res) => {
    const role = req.data.role;
    let userId = req.data.id;
    // const userId = req.params.id;
    let targetUserId = req.params.id;

    // Проверка дали потребителя е "admin" и дали targetUserId не е същият като на текущия потребител
    if (role === 'admin' ) {
        // admin view all
        userId = targetUserId
    } else if (role === 'mod') {
        // view mod end user
        if ((role === 'user'  || role === 'mod' ) && role !== "admin") {
            userId = targetUserId
        } else {
            return res.status(403).json({
                status: false,
                message: "Permission denied mod"
            });
        }
    } else if (role === 'user' && userId === targetUserId) {
        // just view user by id
        if (targetUserId !== userId) {
            return res.status(403).json({
                status: false,
                message: "Permission denied user"
            });
        }
    }

    async function getUsersByRole(role, userId) {
        try {
            let users;
            if (role === 'admin') {
                users = await UserModel.findOne(
                    {
                        attributes:["id","email","status","role"],//on Users table
                        include: [
                            {
                                model: EmployeeModel,
                                attributes: ["firstName","surName","lastName","dateOfBirth","gender","address","phoneNo"],
                            },
                            {
                                model: ExperiencesModel,
                                attributes: ["company","position","start_date_exp","end_date_exp"],
                            },
                            {
                                model: LeavesModel,
                                attributes:["type","status_lea","start_date_lea","end_date_lea"],
                            },
                            {
                                model: CompensationModel,
                                attributes:["salary","currency","bonuses"],
                            },
                            {
                                model: EducationModel,
                                attributes:["degree","institution","start_date_edu","end_date_edu"],
                            },
                            {
                                model: PerformancesModel,
                                attributes:["performance_score","comments","review_date"],
                            },
                            {
                                model: TrainingModel,
                                attributes:["training_name","training_date","trainer"],
                            },
                        ],

                        where: {
                            id: userId,
                        },
                    },
                );
            } else if (role === 'mod') {
                // For role mod and user
                users = await UserModel.findOne(


                    {
                        attributes:["id","email","status","role"],//on Users table
                        include: [
                            {
                                model: EmployeeModel,
                                attributes: ["firstName","surName","lastName","dateOfBirth","gender","address","phoneNo"],
                            },
                            {
                                model: ExperiencesModel,
                                attributes: ["company","position","start_date_exp","end_date_exp"],
                            },
                            {
                                model: LeavesModel,
                                attributes:["type","status_lea","start_date_lea","end_date_lea"],
                            },
                            {
                                model: CompensationModel,
                                attributes:["salary","currency","bonuses"],
                            },
                            {
                                model: EducationModel,
                                attributes:["degree","institution","start_date_edu","end_date_edu"],
                            },
                            {
                                model: PerformancesModel,
                                attributes:["performance_score","comments","review_date"],
                            },
                            {
                                model: TrainingModel,
                                attributes:["training_name","training_date","trainer"],
                            },
                        ],
                        where: {
                            [Op.or]: [
                                { role: 'mod', id: userId },
                                { role: 'user' },
                            ],
                        },
                    });
            } else if (role === 'user') {
                users = await UserModel.findOne(

                    {
                        attributes:["id","email","status","role"],//on Users table
                        include: [
                            {
                                model: EmployeeModel,
                                attributes: ["firstName","surName","lastName","dateOfBirth","gender","address","phoneNo"],
                            },
                            {
                                model: ExperiencesModel,
                                attributes: ["company","position","start_date_exp","end_date_exp"],
                            },
                            {
                                model: LeavesModel,
                                attributes:["type","status_lea","start_date_lea","end_date_lea"],
                            },
                            {
                                model: CompensationModel,
                                attributes:["salary","currency","bonuses"],
                            },
                            {
                                model: EducationModel,
                                attributes:["degree","institution","start_date_edu","end_date_edu"],
                            },
                            {
                                model: PerformancesModel,
                                attributes:["performance_score","comments","review_date"],
                            },
                            {
                                model: TrainingModel,
                                attributes:["training_name","training_date","trainer"],
                            },
                        ],

                        where: {
                            id: userId,
                        },

                    });
            }
            return users;
        } catch (error) {
            console.error('Error retrieving users: ', error);
            throw error;
        }
    }

    try {
        const result = await getUsersByRole(role, userId);

        if (result) {
            res.status(200).json({
                status: true,
                message: `${role} role found`,
                data: result
            });
        } else {
            res.status(500).json({
                status: false,
                message: "Not found users"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error retrieving users"
        });
    }
});

// PUT - for update user data by id
router.put("/edit/:id", jwtMiddleware.checkToken, async (req, res) => {
    const currentUserRole = req.data.role;
    const targetUserId = req.params.id;

    if (currentUserRole !== 'admin' &&  currentUserRole !== 'mod')  {
        return res.status(403).json({
            status: false,
            message: "Unauthorized you not admin or mod"
        });
    }

    try {

        const updatedUser = await UserModel.update(
            {
                email: req.body.email,
                status: req.body.status,
                role: req.body.role,
                // password
            },
            {
                where: {
                    id: targetUserId,
                },
            }
        );


        const updatedLeaves = await LeavesModel.update(
            {
                type: req.body.type, // 'ambulance','unpaid','paid_leave','other'
                status_lea: req.body.status_lea, // 'pending','approved','rejected'
                start_date_lea: req.body.start_date_lea,
                end_date_lea: req.body.end_date_lea
            },
            {
                where: {
                    EmployeeId: targetUserId,
                },
            }
        );


        const updatedEmployee = await EmployeeModel.update(
            {
                firstName: req.body.firstName,
                surName: req.body.surName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                address: req.body.address,
                phoneNo: req.body.phoneNo
            },
            {
                where: {
                    UserId: targetUserId,

                },
            }
        );


        const updatedExperiences = await ExperiencesModel.update(
            {
                company: req.body.company,
                position: req.body.position,
                start_date_exp: req.body.start_date_exp,
                end_date_exp: req.body.end_date_exp
            },
            {
                where: {
                    EmployeeId: targetUserId,
                },
            }
        );


        const updatedCompensation = await CompensationModel.update(
            {
                salary: req.body.salary,
                currency: req.body.currency,
                bonuses: req.body.bonuses
            },
            {
                where: {
                    EmployeeId: targetUserId,
                },
            }
        );


        const updatedEducation = await EducationModel.update(
            {
                degree: req.body.degree,
                institution: req.body.institution,
                start_date_edu: req.body.start_date_edu,
                end_date_edu: req.body.end_date_edu
            },
            {
                where: {
                    EmployeeId: targetUserId,
                },
            }
        );


        const updatedPerformances = await PerformancesModel.update(
            {
                performance_score: req.body.performance_score,
                comments: req.body.comments,
                review_date: req.body.review_date
            },
            {
                where: {
                    EmployeeId: targetUserId,
                },
            }
        );


        const updatedTraining = await TrainingModel.update(
            {
                training_name: req.body.training_name,
                training_date: req.body.training_date,
                trainer: req.body.trainer
            },
            {
                where: {
                    EmployeeId: targetUserId,
                },
            }
        );

        if (
            updatedUser[0] === 0 &&
            updatedLeaves[0] === 0 &&
            updatedEmployee[0] === 0 &&
            updatedExperiences[0] === 0 &&
            updatedCompensation[0] === 0 &&
            updatedEducation[0] === 0 &&
            updatedPerformances[0] === 0 &&
            updatedTraining[0] === 0
        ) {
            return res.status(404).json({
                status: false,
                message: `User with ID ${targetUserId} not found or is not an admin`
            });
        }

        res.status(200).json({
            status: true,
            message: `Data Updated for user with ID ${targetUserId}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: `Error updating data for user with ID ${targetUserId} ${error}`
        });
    }
});

// POST - create user by id
router.post("/create/:id", jwtMiddleware.checkToken, async (req, res) => {
    const currentUserRole = req.data.role;
    const userId = req.params.id;

    if (currentUserRole !== 'admin' && currentUserRole !== 'mod') {
        return res.status(403).json({
            status: false,
            message: "Unauthorized. You are not an admin or mod.",
        });
    }

    const userExists = await EmployeeModel.findOne({
        where: {
            UserId: userId,
        },
    });

    if (userExists) {
        return res.status(400).json({
            status: false,
            message: "User already exists",
        });
    }

    try {
        // Създаване на запис в таблица EmployeeModel
        const newEmployee = await EmployeeModel.create({
            UserId: userId, // Променете го спрямо вашата структура на данните
            firstName: req.body.firstName,
            surName: req.body.surName,
            lastName: req.body["lastName"],
            dataOfBirth: req.body.dataOfBirth,
            gender: req.body.gender,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
            // Добавете останалите полета, които искате
        });

        // Създаване на запис в таблица LeavesModel
        const newLeave = await LeavesModel.create({
            EmployeeId: newEmployee.UserId, // Използвайте ID на създадения Employee
            type: req.body.type,
            status_lea: req.body.status_lea,
            start_date_lea: req.body.start_date_lea,
            end_date_lea: req.body.end_date_lea,
            // Добавете останалите полета, които искате
        });

        // Създаване на запис в таблица ExperiencesModel
        const newExperience = await ExperiencesModel.create({
            EmployeeId: newEmployee.UserId, // Използвайте ID на създадения Employee
            company: req.body.company,
            position: req.body.position,
            start_date_exp: req.body.start_date_exp,
            end_date_exp: req.body.end_date_exp,
            // Добавете останалите полета, които искате
        });

        // Създаване на запис в таблица CompensationModel
        const newCompensation = await CompensationModel.create({
            EmployeeId: newEmployee.UserId, // Използвайте ID на създадения Employee
            salary: req.body.salary,
            currency: req.body.currency,
            bonuses: req.body.bonuses,
            // Добавете останалите полета, които искате
        });

        // Създаване на запис в таблица EducationModel
        const newEducation = await EducationModel.create({
            EmployeeId: newEmployee.UserId, // Използвайте ID на създадения Employee
            degree: req.body.degree,
            institution: req.body.institution,
            start_date_edu: req.body.start_date_edu,
            end_date_edu: req.body.end_date_edu,
            // Добавете останалите полета, които искате
        });

        // Създаване на запис в таблица PerformancesModel
        const newPerformance = await PerformancesModel.create({
            EmployeeId: newEmployee.UserId, // Използвайте ID на създадения Employee
            performance_score: req.body.performance_score,
            comments: req.body.comments,
            review_date: req.body.review_date,
            // Добавете останалите полета, които искате
        });

        // Създаване на запис в таблица TrainingModel
        const newTraining = await TrainingModel.create({
            EmployeeId: newEmployee.UserId, // Използвайте ID на създадения Employee
            training_name: req.body.training_name,
            training_date: req.body.training_date,
            trainer: req.body.trainer,
            // Добавете останалите полета, които искате
        });

        res.status(201).json({
            status: true,
            message: "Data created successfully",
            data: {
                employee: newEmployee,
                leave: newLeave,
                experience: newExperience,
                compensation: newCompensation,
                education: newEducation,
                performance: newPerformance,
                training: newTraining,
                // Включете останалите данни от другите таблици
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error creating data: " + error,
        });
    }
});

// Delete - user by id with admin role and all data
router.delete("/delete/:id", jwtMiddleware.checkToken, async (req, res) => {
    const currentUserRole = req.data.role;
    const userIdToDelete = req.params.id;

    if (currentUserRole !== 'admin') {
        return res.status(403).json({
            status: false,
            message: "Unauthorized. Only admin users can delete users."
        });
    }

    // Намерете потребителя по id
    const userToDelete = await UserModel.findOne({ where: { id: userIdToDelete } });

    if (!userToDelete) {
        return res.status(404).json({
            status: false,
            message: `User with ID ${userIdToDelete} not found`
        });
    }

    try {
        // Намерете всички свързани записи в останалите таблици, използвайки userIdToDelete
        await EmployeeModel.destroy({ where: { UserId: userIdToDelete } });
        await ExperiencesModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await LeavesModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await CompensationModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await EducationModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await PerformancesModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await TrainingModel.destroy({ where: { EmployeeId: userIdToDelete } });

        // Сега, след като сте изтрили всички свързани записи, може да изтриете и потребителя
        await UserModel.destroy({ where: { id: userIdToDelete } });

        res.status(200).json({
            status: true,
            message: `User with ID ${userIdToDelete} and associated records deleted successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: `Error deleting user with ID ${userIdToDelete}`
        });
    }
});

// Delete - employee by id with admin role and all data not user
router.delete("/delete/employee/:id", jwtMiddleware.checkToken, async (req, res) => {
    const currentUserRole = req.data.role;
    const userIdToDelete = req.params.id;

    if (currentUserRole !== 'admin') {
        return res.status(403).json({
            status: false,
            message: "Unauthorized. Only admin users can delete users."
        });
    }

    // Намерете потребителя по id
    const userToDelete = await EmployeeModel.findOne({ where: { UserId: userIdToDelete } });

    if (!userToDelete) {
        return res.status(404).json({
            status: false,
            message: `Employee with ID ${userIdToDelete} not found`
        });
    }

    try {
        // Намерете всички свързани записи в останалите таблици, използвайки userIdToDelete
        await EmployeeModel.destroy({ where: { UserId: userIdToDelete } });
        await ExperiencesModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await LeavesModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await CompensationModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await EducationModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await PerformancesModel.destroy({ where: { EmployeeId: userIdToDelete } });
        await TrainingModel.destroy({ where: { EmployeeId: userIdToDelete } });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: `Error deleting employee with ID ${userIdToDelete}`
        });
    }
});



module.exports = router;

