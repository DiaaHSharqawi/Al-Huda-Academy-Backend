# Al-Huda-Academy-Backend Software Project
![moltqa](https://github.com/user-attachments/assets/78dec6ef-b4e5-45cc-bc80-66714b81d1ef)

This is a Node.js API project for Al-Huda-Academy, developed as part of a software graduation project. The platform offers advanced features for Quran recitation and exploration, including the Login Page, Home Page, Search Results for Quranic Surahs and Verses, Detailed Surah Explanations, Secure Account Management, an Admin Panel for managing users and Quranic content, etc.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Architecture](#Architecture)
6. [API Documentation](#api-documentation)

## Overview

The **Al-Huda-Academy-Backend** project is a Node.js API designed to support an advanced Quran recitation and exploration platform. This application allows users to access, search, and explore Quranic content while providing a secure, user-friendly interface.

## Features

- User Authentication (Login, Register)
- Search functionality for Quranic Surahs and Verses
- Detailed Explanations of Quranic Surahs
- Secure Account Management for users
- Admin Panel for user and content management
- **Categorized Athkar**: Fetch and display categorized Athkar with pagination and filtering capabilities.
- **Family Link Verification**: Verify child-parent links using verification codes.
- **Teaching Methods Management**: APIs to manage and retrieve teaching methods.
- **Participant Management**: Retrieve participant information by user ID.
- **Language Support**: Manage and retrieve supported languages.
- **Group Goals**: APIs to manage and fetch group goals.
- **Notification System**: Retrieve and manage user notifications.
- **Role Management**: Manage different user roles within the system.
- **Day Schedules**: Retrieve days and related schedules.
- **Memorization Groups**: Manage and fetch details about memorization groups.

## Technologies Used

- **Node.js** for server-side development
- **Express.js** as the web framework
- **MongoDB** for data storage
- **JSON Web Tokens (JWT)** for secure user authentication
- **Sequelize** as the ORM for SQL-based models

## Installation

To install the project and its dependencies, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/DiaaHSharqawi/Al-Huda-Academy-Backend.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory and specifying the required configuration.

## Architecture
![MVC](https://github.com/user-attachments/assets/327cf6e1-eb17-4b62-bf66-128f9acaf6bf)

The Model-View-Controller (MVC) architecture is a design pattern used in API development to organize code into three main parts, making the development process simpler and more reliable:

- **Model**: Manages the data and database interactions, such as storing and retrieving information.
- **View**: Prepares the data and sends it back to the client, often as JSON, so it can be used by the client-side application.
- **Controller**: Handles user requests, processes them, communicates with the model to get or update data, and passes the data to the view to send back as a response.

## API Documentation

Here are the API docs for GitHub, where you can find details about its features and usage: [API Documentation](https://documenter.getpostman.com/view/33050087/2sAYBPktih)
