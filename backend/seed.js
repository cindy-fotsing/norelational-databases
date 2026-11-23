const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  await users.insertOne({
    name: "Mandy",
    email: "mandy@example.com",
    address: {
      city: "Paris",
      country: "France"
    }
  });
  // The address must have at least a city and a country field.

  // TODO 2: insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "Bob",
    email: "bob@example.com",
    skills: ["JavaScript", "Python", "Java", "SQL"]
  });

  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
  await users.insertMany([
    {
      name: "Carl",
      email: "carl@example.com",
      address: {
        city: "Toulouse",
        country: "France"
      },
      skills: ["C++"]
    },
    {
      name: "Alan",
      email: "alan@example.com",
      address: {
        city: "Marseille",
        country: "France"
      },
      skills: ["Python"]
    },
    {
      name: "Eve",
      email: "eve@example.com",
      address: {
        city: "Berlin",
        country: "Germany"
      },
      skills: ["Dance"]
    },
    {
      name: "Frank",
      email: "frank@example.com",
      address: {
        city: "Rome",
        country: "Italy"
      },
      skills: ["Cook"]
    },
    {
      name: "Grace",
      email: "grace@example.com",
      address: {
        city: "Madrid",
        country: "Spain"
      },
      skills: ["Eat"]
    }
  ]);

  // TODO 4: retrieve all documents and log each user's name.
  const allUsers = await users.find({}).toArray();
  allUsers.forEach((user) => {
    console.log(user.name);
  });

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
  const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log(parisUser);

  // TODO 6: find all users whose address.country is "France" and log their names.
  const frenchUsers = await users.find({ "address.country": "France" }).toArray();
  frenchUsers.forEach((user) => {
    console.log(user.name);
  });

  // TODO 7: find all users who have a skills field and log their names.
  const usersWithSkills = await users.find({ skills: { $exists: true } }).toArray();
  usersWithSkills.forEach((user) => {
    console.log(user.name);
  });

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
