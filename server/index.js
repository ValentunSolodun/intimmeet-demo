const db = require('./db');
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/login', H(async (req, res) => {

  const userObj = {
    login: req.body.login,
    password: req.body.password
  };

  const users = await db.awaitSQL`select * from users where login=${userObj.login} limit 1`;
  if (!users) throw Error('No user')
  const user = users[0];
  const guids = await getGuids([user.id], []);
  if (!guids) throw Error('No ids')

  if (_.isEmpty(user)) {
    res.sendStatus(403);
    return;
  }

  if (userObj.password !== user.password) {
    res.sendStatus(403);
    return;
  }

  user.guid = guids[0][0]

  let token = generateToken(user.id, user.login);
  res.send({token, permission: user.permission, user: user});
}));

app.use('/', (req, res, next) => {

  let token = req.headers.token;

  jwt.verify(token, 'secret', (err, data) => {
    if (err) {
      res.sendStatus(401);
    } else {
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      // res.setHeader('Access-Control-Allow-Credentials', true);
      req.user = data;
      next();
    }

  });
});

app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', '*');
  res.append('X-Total-Count', '100');
  res.append('Content-Range', '100');
  next();
});


//Customers

// app.get('/api/customers', async (req, res) => {
//   const customers = await db.promise().query('select * from customers');
//   // await Promise.all(UsersData[0].map(async u => {
//   //   const getCustomers = await db.promise().query(`select c.id, c.name from users_customers uc join customers c on uc.customerId=c.id where userId = ${u.id}`);
//   //   u.customers = getCustomers[0];
//   // }));
//   res.send(customers[0]);
// });
//
// app.get('/api/customers/:customerId', async (req, res) => {
//   const customers = await db.promise().query(`select * from customers c
//   where id=${req.params.customerId}`);
//   res.send(customers[0][0]);
// });

//
//
// app.post('/customer/get_user_ids', async (req, res) => {
//   const {user_ids, target_ids} = req.body;
//
//
//
//   const exampleDate = {
//     "user_ids": [
//       "4lnjZOmhL8rVXDfMD1vjYFzX4KwJI4R5nYYTyX8zexFKo",
//       "VN0jaw3IeLYJ4vTxg4b3rCXAoMdwCrVyb33hoxQrQYskw",
//       "aDV01QNTbwR4MQIvYZW9Bf0rvWGZho5VDnntQ5mwmyFg6"
//     ],
//     "target_ids": [
//       "oNpKaQBIe0bpKribM4N8DS4KZLA1uRQ0GWWcrlyZzqCDr",
//       "zyBwNzZSQwBbyLu3O0bK9tvrb9plCwvykAAfOxaozdc6B",
//       "mgoAYxVfNA45prCBY8eG5UW6OjbnTyAGB99uGwW3KkhV1"
//     ]
//   };
//
//   res.send(exampleDate)
// });

//User Data

app.get('/api/users', H(async (req, res) => {
  // const parsedFilter = JSON.parse(req.query.filter);
  // if (parsedFilter.customer_user_id) {
  //   const usersById = await db.promise().query(`select * from user_data where customer_user_id='${parsedFilter.customer_user_id}'`);
  //   usersById[0] = usersById[0].map(u => ({...u, is_active: Boolean(u.is_active)}))
  //   res.send(usersById[0]);
  //   return;
  // }
  const friends = await db.awaitSQL`select u.id, u.name, u.login, u.img_src, u.location 
  from users_friends uf 
  join users u on uf.friend_id = u.id 
  where uf.user_id=${req.user.id} and u.id <> ${req.user.id}`;

  // users[0] = users[0].map(u => ({...u, is_active: Boolean(u.is_active)}))
  // await Promise.all(UsersData[0].map(async u => {
  //   const getCustomers = await db.promise().query(`select c.id, c.name from users_customers uc join customers c on uc.customerId=c.id where userId = ${u.id}`);
  //   u.customers = getCustomers[0];
  // }));
  res.send(_.map(friends, (u, i) => ({...u})));
}));

app.get('/api/users/:userId', H(async (req, res) => {
  const users = await db.awaitSQL`select * from users u where u.id=${req.params.userId} limit 1`;
  if (!users) throw Error('No user')
  const user = users[0]
  const guids = await getGuids([], [user.id]);
  if (!guids) throw Error('No ids')
  user.guid = guids[1][0]
  res.send(user);
}));
//
// app.put('/api/users/:userId', H(async (req, res) => {
//   const modifiedDate = new Date();
//   const user = await db.awaitSafe(`update users u set is_active='${req.body.isActive}',
//   modified='${modifiedDate.toISOString()}' where u.id=${req.params.userId};`);
//   res.send(user[0]);
// }));

app.use((err, req, res, next) => {
  if (err) {
    console.log('ERR:', err)
    return res.status(500)
  }
  next();
})

async function getGuids(userIds, targetIds) {
  const access = {
    api_key: 'apikey1234qwer',
    api_secret: 'secret_asdf\\\'k;kcc'
  };
  return await axios.post('http://api-local.intimmeet.com/customer/get_user_ids', {
    token: Buffer.from(`${access.api_key}:${access.api_secret}`).toString('base64'),
    user_ids: _.map(userIds, Number),
    target_ids: _.map(targetIds, Number)
  }).then(({data}) => [data.user_ids, data.target_ids]).catch((err) => console.error('API:', err));
}

//

// User Subscription

// app.get('/api/user-subscription', async (req, res) => {
//   const parsedFilter = JSON.parse(req.query.filter);
//   if (parsedFilter.customer_user_id) {
//     const userSubscription = await db.promise().query(`select
//     s.id,
//     s.user_id,
//     s.subscription_type,
//     s.period_start,
//     s.period_end,
//     s.current_credit_regular,
//     s.current_credit_added,
//     s.audio_rate,
//     s.video_rate,
//     s.renewal_credit
//     from user_data u
//     join user_subscription s
//     on u.user_id=s.user_id
//     where u.customer_user_id=${parsedFilter.customer_user_id}`);
//     res.send(userSubscription[0]);
//     return;
//   }
//   const userSubscription = await db.promise().query('select * from user_subscription');
//   res.send(userSubscription[0]);
// });

//

// User Approvals

// app.get('/api/user-approvals', async (req, res) => {
//   const approvals = await db.promise().query('select * from user_approvals');
//   res.send(approvals[0]);
// });

//

// Credit Transactions

// app.get('/api/credit-transactions', async (req, res) => {
//   const transactions = await db.promise().query('select * from credit_transactions');
//   res.send(transactions[0]);
// });

//

// Call log

// app.get('/api/call-log', async (req, res) => {
//   const callLogs = await db.promise().query('select * from call_log');
//   callLogs[0] = callLogs[0].map(u => ({...u, video: Boolean(u.video)}))
//   res.send(callLogs[0]);
// });

//

// Video system data

// app.get('/api/video-system-data', async (req, res) => {
//   const VideoSystemData = await db.promise().query('select * from video_system_data');
//   res.send(VideoSystemData[0]);
// });

//


// app.get('/api/customers', async (req, res) => {
//   const parsedFilter = JSON.parse(req.query.filter);
//   if(parsedFilter.user_id) {
//     const customersById = await db.promise().query(`select * from customers where user_id=${parsedFilter.user_id}`);
//     res.send(customersById[0]);
//     return;
//   }
//
//   const customers = await db.promise().query(`select * from customers`);
//   res.send(customers[0]);
// });
//
// app.get('/api/customers/:customerId', async (req, res) => {
//   const customers = await db.promise().query(`select uc.userId as user_id, c.id, c.name from users_customers uc
//   join customers c on uc.customerId=c.id where uc.customerId=${req.params.customerId}`);
//   res.send(customers[0][0]);
// });
//
// app.put('/api/customers/:customersId', async (req, res) => {
//   const customer = await db.promise().query(`update customers c set name='${req.body.name}' where c.id=${req.params.customerId};`);
//   res.send(customer[0]);
// });


app.listen(3001, () => console.log('server listening on 3001'));


function generateToken(id, login) {
  let u = {
    id,
    login,
  };
  return jwt.sign(u, 'secret', {
    expiresIn: 60 * 60 * 24
  });
}


function H(handler) {
  return (req, res, next) => {
    try {
      Promise.resolve(handler(req, res, next)).catch(next)
    } catch (err) {
      next(err);
    }
  }
}
