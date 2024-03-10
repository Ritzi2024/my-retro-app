// const { gql } = require('apollo-server-express');
import gql from "graphql-tag";

const typeDefs = gql`
    type TodoCount {
        _id: String,
        todos: [Todo]
    }
    type TodoDashboardByCategoryCount{
        _id: String,
        count: Float,
    }
    type TodoDashboardByDateCount{

        _id: String,
        active: Float,
        completed: Float,
        total: Float
       
    }
    type RetroCount {
        _id: String,
        retros: [Retro]
    }
    type Todo {
        _id: String,
        title: String,
        category: String,
        criteria: String,
        description: String,
        resolutionDate: String,
        convertedDate: String,
        updatedAt: String,
        completed: Boolean,
        star: Boolean,
        tasks: [String]
    }
    type Action {
        title: String,
        taskId: String
    }
    type Retro {
        _id: String,
        date: String,
        title: String,
        convertedDate: String,
        good: [String],
        ok: [String],
        actions: [Action]
    }
    input ActionInput {
        title: String,
        taskId: String
    }
    input MiniTodoInput {
        title: String
    }
    input TodoInput {
        title: String
        category: String,
        criteria: String,
        description: String,
        resolutionDate: String,
        completed: Boolean,
        star: Boolean,
        tasks: [String]
    }
    input RetroInput{
        title: String,
        date: String,
        good: [String],
        ok: [String],
        actions: [ActionInput]
    }
    input DateRange{
        to: String,
        from: String
    }
    type Query{
        hello: String
        todo(ID: ID!): Todo!
        getTodos(category: String): [Todo]
        getTodoCounts: [TodoCount]
        getRetro(ID: ID): Retro!
        getRetros: [Retro]
        getLastTodosByDate(dateRange: DateRange): [TodoDashboardByDateCount]
        getLastTodosByCategory(dateRange: DateRange): [TodoDashboardByCategoryCount]
        getAllTodos(dateRange: DateRange): [TodoCount]
    }
    type Mutation {
        createTodo(todoInput: TodoInput): Todo!
        deleteTodo(ID: ID!): Boolean
        editTodo(ID: ID!, todoInput: TodoInput): Todo!
        markTodoAsCompleted(ID: ID!): Todo!
        createRetro(retroInput: RetroInput): Retro!
        editRetro(ID: ID!, retroInput: RetroInput): Retro!
    }
`;

module.exports = typeDefs;
