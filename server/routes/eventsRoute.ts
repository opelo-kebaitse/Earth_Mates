import express from 'express'
import * as db from '../db/events.ts'

// route to get events list

router.get('/', async (req, res) => {
  try {
    const events = await db.getEventList()
    res.json(events)
  } catch (error) {
    res.status(500).json('Internal server error')
  }
})
