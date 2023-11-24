import { Router } from 'express'

import checkJwt, { JwtRequest } from '../auth0.ts'
import * as db from '../db/user.ts'
const router = Router()

//Get route for /api/v1/users
router.get('/', checkJwt, async (req: JwtRequest, res) => {

// router.get('/', async (req, res) => {
  try {
    const auth0Id = req.auth.sub
    const userDetail = await db.getUserDetail(auth0Id)
    res.json({ userDetail })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// post route /api/v1/users
router.post('/', async (req: JwtRequest, res) => {
  const newestUser = req.body // Retrieve the new  data from the request body.
  const addedUser = await db.newUser(newestUser)
  // Use the new function to add the new url to the database and await the promise it returns.
  res.json(addedUser) // Respond with the data of the newly added data in JSON format.
})

export default router
