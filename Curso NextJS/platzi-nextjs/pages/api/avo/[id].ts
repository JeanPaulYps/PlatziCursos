import DB from '@database'
import { NextApiRequest, NextApiResponse } from 'next'

const allAvos = async (request: NextApiRequest, response: NextApiResponse) => {
  const db = new DB()
  const id = request.query.id as string
  const entry = await db.getById(id)
  response.status(200).json(entry)
}

export default allAvos
