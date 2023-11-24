import { Router } from 'express'
import * as db from '../db/events.ts'
import { newEvent } from '../db/events.ts'

import { JwtRequest } from '../auth0.ts'

const router = Router()

// get events route /api/v1/events
router.get('/', async (req, res) => {
  try {
    const events = await db.getEventList()
    res.json(events)
  } catch (error) {
    res.status(500).json('Internal server error')
  }
})


// post route /api/v1/events
router.post('/', async (req: JwtRequest, res) => {
  const newestEvent = req.body 
  const addedEvent = await newEvent(newestEvent)
  res.json(addedEvent) 
})

// get events by id route
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    console.error('No valid id')
    return res.status(404).send('Bad request')
  }

  try {
    const id = Number(req.params.id)
    const event = await db.getEventDetails(id)
    res.json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal server error')
  }
})

// update an event route
router.patch('/:id', async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    console.error('No valid id')
    return res.status(404).send('Bad request')
  }

  try {
    const updatedEvent = await db.updateEvent(id, req.body)
    res.json(updatedEvent)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal server error')
  }
})

// delete an event route
router.delete('/:id', async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    console.error('No valid id')
    return res.status(404).send('Bad request')
  }

  try {
    const deletedEvent = await db.deleteEvent(id)
    res.json(deletedEvent)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal server error')
  }
})

export default router
