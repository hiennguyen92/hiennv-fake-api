Fake Api Server

*   [GitHub](https://github.com/hiennguyen92)
*   [Website](https://hiennv.com)
*   [Upwork](https://www.upwork.com/freelancers/~01e8865aa693b1478a)

Welcome!
========

You're successfully.  
✧\*｡٩(ˊᗜˋ\*)و✧\*｡

Auth
====

### Register

*   `POST` [/register](register) `{ "email": "example@gmail.com", "password": "123456", ... }`
*   `POST` [/signup](signup) `{ "email": "example@gmail.com", "password": "123456", ... }`
*   `POST` [/users](users) `{ "email": "example@gmail.com", "password": "123456", ... }`

### Login

*   `POST` [/login](login) `{ "email": "example@gmail.com", "password": "123456" }`
*   `POST` [/signin](signin) `{ "email": "example@gmail.com", "password": "123456", }`

### Authorization

Using header: `Authorization: Bearer >>accessToken<<`

### Upload

*   `POST` [/avatar](avatar) `"Content-Type": "multipart/form-data"` `"avatar": File?`

Resources
=========

*   [/users](users) 1x
*   [/posts](posts) 1x
*   [/comments](comments) 1x
*   [/profiles](profiles) 1x
*   [/categories](categories) 10x
*   [/public](public) object

To access and modify resources, you can use any HTTP method:

`GET` `POST` `PUT` `PATCH` `DELETE` `OPTIONS`

Custom Routes
=============

/users\*

`⇢` /400/users$1

/profiles\*

`⇢` /400/profiles$1

/posts\*

`⇢` /644/posts$1

/comments\*

`⇢` /644/comments$1

/categories\*

`⇢` /400/categories$1

/public\*

`⇢` /444/public$1

Documentation
=============

[JSON Server](https://github.com/typicode/json-server)  
  
[JSON Server Auth](https://github.com/jeremyben/json-server-auth)
