# Fish & Friends

## A school project in fullstack

We were tasked with creating a fullstack web application for a restaurant, catering to both customers and restaurant staff.

Customers can place orders and make modifications using a web shop interface. They can also cancel orders if the staff has not yet processed them.

On the other hand, the staff can view incoming orders and process them by initially 'locking' the orders, preventing customers from deleting them, and marking orders as completed.

We adhered to Scrum principles, conducting daily stand-ups, along with weekly sprint reviews and retrospectives. We rotated roles, taking turns as the Scrum Master.

## Project journey

We employed the 'Emphasize, Define, Ideate, Prototype, Test' framework throughout our project. Upon receiving the criteria for the web application, we created user stories and associated personas.

After that, we started discussing what features and functions that were crucial in order to meet the client criterias. Once we had a clear idea of the features to include, we individually developed wireframes. From these, we selected the most effective elements.

A hi-fi prototype was then made, forming the basis for testing.
We tested the prototype on four subjects, noting their inputs in four distinct feedback grids.
From our results, we picked out the most important and relevant inputs, and designed the next prototype version based on the findings.
This process was repeated twice.

Following our initial sprint review with the client, we started coding.
Using JIRA, we kept track of our progress and sprints by referencing our user stories.

## Our tech stack

We utilized a combination of **TypeScript** and **JavaScript** within **React** for the front end. Our backend was built using **Express**, while using **MongoDB Atlas** as our database.

## API documentation

### Data modelling

| Meal            |          |                         |
| --------------- | -------- | ----------------------- |
| **\_id**        | number   | id from database        |
| **name**        | string   | dish name               |
| **description** | string   | description of the dish |
| **image**       | string   | url to local image      |
| **total**       | number   | price                   |
| **category**    | string   | head category           |
| **subcategory** | [string] | subcategory             |
| **allergenes**  | [string] | allergenes              |

---

| Order       |         |                       |
| ----------- | ------- | --------------------- |
| **\_id**    | number  | id from database      |
| **orderId** | number  | shorter id for users  |
| **date**    | string  | timestamp ISO UTC     |
| **content** | [meal]  | meal-objects          |
| **total**   | number  | total price           |
| **status**  | string  | order status          |
| **locked**  | boolean | if order is processed |

---

| Populars    |        |                  |
| ----------- | ------ | ---------------- |
| **\_id**    | number | id from database |
| **items**   | [meal] | meal-objects     |
| **forWeek** | number | weeknumber       |

---

| User         |        |                    |
| ------------ | ------ | ------------------ |
| **\_id**     | number | id from database   |
| **name**     | string | employeenumber     |
| **password** | string | encrypted password |

---

## Endpoints

### Menu

#### Fetch full menu

```js
[GET]api/meals
```

example

```js
axios
	.get('/api/meals')
	.then((response) => console.log(response.data))
	.catch((error) => console.error('error feching meals', error));
```

#### Fetch individual dish

```js
[GET]api/meals/:id
```

---

### Orders

#### Fetch all orders

```js
[GET]api/orders
```

#### Post order

```js
[POST]api/orders

REQUIRES BODY:

{
	orderId: 12345,
	content: [meal-objects],
	total: 99,
	status: "received",
	locked: false,
}
```

#### Edit order

```js
[PUT]api/orders/:id

// REQUIRES BODY (same as POST)
```

#### Delete order

```js
[DELETE]api/orders/:id
```

---

### Populars

#### Fetch popular

```js
[GET]api/popular
```

---

### User

#### Login

```js
[POST]api/login

REQUIRES BODY:

{
	name: username,
	password: password
}
```

---

### Customer

#### Check if order is locked, deletes order if it's not locked

```js
[GET]api/customer/:id
```

---

### made by ByteBenders @ Folkuniversitetet Karlstad 2023

##### ([ElinHagelin](https://github.com/ElinHagelin), [Hollgy](https://github.com/Hollgy), [RobinLarsson1](https://github.com/RobinLarsson1), [vectorell](https://github.com/vectorell), [Willi4mL](https://github.com/Willi4mL))
