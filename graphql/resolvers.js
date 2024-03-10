// const {} = require("apollo-server")
// const Task = require("../models/Task")
// const Todo = require("../models/Todo")
// const Retro = require("../models/Retro")
import Todo from "../models/Todo";
import Retro from "../models/Retro";

module.exports = {
    Query: {
        async todo(_, { ID }) {
            const t = await Todo.findById(ID);
            t.criteria = (new Date().toDateString() == new Date(t.resolutionDate).toDateString()) ? '7' : '0';
            return t;
        },
        async getTodos(_, { category }) {
            let startTime;
            let endTime;

            console.log(category);
            switch (category) {
                case "0":
                    startTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(0, 0, 0, 0)).toISOString();
                    endTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(23, 59, 59, 999)).toISOString();
                    break;
                case "1":
                    startTime = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)).toISOString();
                    endTime = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(23, 59, 59, 999)).toISOString();
                    break;
                case "7":
                    startTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(0, 0, 0, 0)).toISOString();
                    endTime = new Date(new Date(new Date().setDate(new Date().getDate() + 7)).setHours(23, 59, 59, 999)).toISOString();
                    break;
                case "30":
                    startTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(0, 0, 0, 0)).toISOString();
                    endTime = new Date(new Date(new Date().setDate(new Date().getDate() + 30)).setHours(23, 59, 59, 999)).toISOString();
                    break;
                default:
                    startTime = new Date(new Date(category).setHours(0, 0, 0, 0)).toISOString();
                    endTime = new Date(new Date(category).setHours(23, 59, 59, 999)).toISOString();
                    console.log(startTime);
                    console.log(endTime);
                    break;
            }

            return await Todo.aggregate([
                {
                    $match:
                    {
                        "resolutionDate":
                        {
                            $gte: startTime,
                            $lte: endTime
                        }
                    }
                }
            ])

            // return await Todo.find().sort({ createdAt: -1 })
        },
        async getTodoCounts(_) {
            const startTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(0, 0, 0, 0)).toISOString();

            try {
                const groupedTodosByDate = await Todo.aggregate([
                    {
                        $match: {
                            resolutionDate: {
                                $gt: startTime
                            }
                        }
                    },
                    {
                        $addFields: {
                            convertedDate: {
                                $toDate: "$resolutionDate"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    date: "$convertedDate"
                                }
                            },
                            todos: {
                                $push: "$$ROOT"
                            }
                        }
                    },
                    {
                        $sort: {
                            "_id": 1
                        }

                    }
                ]);
                return groupedTodosByDate;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch todo counts.');
            }
        },
        async getRetro(_, { ID }) {
            let startTime;
            let endTime;

            if(!ID){
                startTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(0, 0, 0, 0)).toISOString();
                endTime = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(23, 59, 59, 999)).toISOString();
                console.log(startTime, endTime);
                return await Retro.findOne({date:{$gte:startTime,$lt:endTime}});
            }    

            return await Retro.findOne({ _id: ID });
        },
        async getRetros(_, { }) {
            try {
                return await Retro.find(); //.sort({ date: -1 });
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch retro list.');
            }
        },
        async getLastTodosByDate(_, { dateRange }) {
            const data = await Todo.aggregate([
                {
                  $match: { "resolutionDate": { $gte: dateRange.from, $lt: dateRange.to } }
                },
                {
                  $group: {
                    _id: {
                      date: "$resolutionDate",
                      completed: "$completed"
                    },
                    count: { $sum: 1 }
                  }
                },
                {
                  $group: {
                    _id: "$_id.date",
                    active: {
                      $sum: {
                        $cond: [{ $eq: ["$_id.completed", false] }, "$count", 0]
                      }
                    },
                    completed: {
                      $sum: {
                        $cond: [{ $eq: ["$_id.completed", true] }, "$count", 0]
                      }
                    },
                    total: { $sum: "$count" }
                  }
                },
                {
                  $sort: { _id: 1 } // Sort by date if needed
                }
              ]);

              console.log(data);
              return data;

        },
        async getLastTodosByCategory(_, { dateRange }) {
            return await Todo.aggregate([
                [
                    {
                        $match: { "resolutionDate": { $gte: dateRange.from, $lt: dateRange.to }  }
                    },
                    {
                        $group: {
                          _id: "$category",
                          count: { $sum: 1 }
                        }
                      }
                ]
            ])

        },
        async getAllTodos(_, { dateRange }) {
            try {
                const groupedTodosByDate = await Todo.aggregate([
                    {
                        $match: {
                            resolutionDate: {
                                $gte: dateRange.from,
                                $lte: dateRange.to
                            }
                        }
                    },
                    {
                        $addFields: {
                            convertedDate: {
                                $toDate: "$resolutionDate"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    date: "$convertedDate"
                                }
                            },
                            todos: {
                                $push: "$$ROOT"
                            }
                        }
                    },
                    {
                        $sort: {
                            "_id": 1
                        }

                    }
                ]);
                return groupedTodosByDate;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch todo counts.');
            }
        }
    },
    Mutation: {
        async createTodo(_, { todoInput }) {
            const { title, description, resolutionDate, category, criteria, star, tasks } = todoInput;
            let time;

            switch (criteria) {
                case "0":
                    time = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(23, 59, 59, 999)).toISOString();
                    break;
                case "1":
                    time = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(23, 59, 59, 999)).toISOString();
                    break;
                case "7":
                    time = new Date(new Date(new Date().setDate(new Date().getDate() + 7)).setHours(23, 59, 59, 999)).toISOString();
                    break;
                case "30":
                    time = new Date(new Date(new Date().setDate(new Date().getDate() + 30)).setHours(23, 59, 59, 999)).toISOString();
                    break;
                default:
            }
            const createdTodo = new Todo({
                title,
                category,
                criteria,
                description,
                resolutionDate: time,
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                star,
                tasks
            });

            const res = await createdTodo.save();

            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteTodo(_, { ID }) {
            const wasDeleted = (await Todo.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted;
        },

        async editTodo(_, { ID, todoInput }) {
            const { title, description, resolutionDate, category, completed, star, tasks } = todoInput;
            const wasEdited = (await Todo.updateOne({ _id: ID }, {
                title,
                description,
                resolutionDate,
                star,
                category,
                completed,
                tasks
            })).modifiedCount;

            // if(!wasEdited){
            //     return null;
            // }

            const t = await Todo.findById(ID);
            t.criteria = (new Date().toDateString() == new Date(t.resolutionDate).toDateString()) ? '7' : '0';
            return t;
        },

        async markTodoAsCompleted(_, { ID }) {
            const wasEdited = (await Todo.updateOne({ _id: ID }, {
                completed: true,
                updatedAt: new Date().toISOString()
            })).modifiedCount;

            // if(!wasEdited){
            //     return null;
            // }

            const t = await Todo.findById(ID);
            t.criteria = (new Date().toDateString() == new Date(t.resolutionDate).toDateString()) ? '7' : '0';
            return t;
        },

        async createRetro(_, { retroInput }) {
            const { date, title, good, ok, actions } = retroInput;
            const createdRetro = new Retro({
                date,
                title,
                good,
                ok,
                actions,
            });

            const res = await createdRetro.save();

            return {
                id: res.id,
                ...res._doc
            }
        },

        async editRetro(_, { ID, retroInput }) {
            const { title, good, ok, actions } = retroInput;
            const wasEdited = (await Retro.updateOne({ _id: ID }, {
                title,
                good,
                ok,
                actions
            })).modifiedCount;

            // if(!wasEdited){
            //     return null;
            // }

            const t = await Retro.findById(ID);
            return t;
        },
    }
}