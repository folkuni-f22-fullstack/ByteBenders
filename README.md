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

## Example request
### Fetch menu
```js
axios
	.get("/api/meals")
	.then((response) => console.log((response.data)))
	.catch((error) => console.error("error feching meals", error));
```

### Other endpoints
* `api/orders`
* `api/login`
* `api/popular`
* `api/customer`

---
### made by ByteBenders @ Folkuniversitetet Karlstad 2023 
##### ([ElinHagelin](https://github.com/ElinHagelin), [Hollgy](https://github.com/Hollgy), [RobinLarsson1](https://github.com/RobinLarsson1), [vectorell](https://github.com/vectorell), [Willi4mL](https://github.com/Willi4mL))