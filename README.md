# image-bbox-tagging

This project was inspired after watching the following [video](https://www.youtube.com/watch?v=HTXTVfBCeSY).

The project

- Allows users to upload image from the GUI
- Allows users to upload image after hitting the `/api/tags` endpoint and sending `formData` request, containing (`image`,`instructions`,`urgency` and `optional` `objectsToAnnotate`). If no annotating labels are provided in the request, the GUI allows creating customs labels for the images.
- Has frontend GUI, which allows users to label images and delete images
- Has alternative page, showing all the labeled images so far

## Technologies used:

- Prisma
- NestJS
- React (Typescript)
- React Bootstrap
- Postgresql

## Instructions (with Docker)

In the main directory run `docker-compose build`, after the build is done run `docker-compose up` , it should do the work for you. Access the app on `http://localhost:3000`

> If you get error after running `docker-compose up` on the first try, stop it and try again.

## Instructions (without Docker)

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
npm install
```

Next run the following command

```
npm run installPackages
```

This command will concurrently install the necessary npm packages for both backend and frontend.

### Migrating the database

Make sure you have your database running.
You need to create `.env` file in `backend` directory and populate it by following `.env.example` file. </br>

Next change the directory from main folder to

```
cd ./backend
```

And run the following two commands

```
npx prisma migrate dev
npx prisma generate
```

This command will migrate the prisma schema to the database, and generate artifacts.

## Running the project

### Running in development

Make sure you have your database running.

After everything is set, next time if you want to start the project all you need to do is run this command `npm run dev`
from the main directory which will start server side and back side concurrently.

You can start them independently with the following commands.

```
npm run server - start server side
npm run client - start frontend side
```

## Images of the GUI

### Main page

![Screenshot from 2023-07-05 15-43-07](https://github.com/yosko99/image-bbox-tagging/assets/80975936/180fd0a8-76f0-4ed5-93e1-909ed07fda50)

### Upload image form

![image](https://github.com/yosko99/image-bbox-tagging/assets/80975936/1e2f5ea7-54e0-4061-8aea-cabd8d3211e3)

### Labeled images page

![image](https://github.com/yosko99/image-bbox-tagging/assets/80975936/2eb08d5d-9d84-4815-8cb2-ddb5c66dd4d5)
