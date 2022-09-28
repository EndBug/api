import { VercelRequest, VercelResponse } from '@vercel/node'

export default (_req: VercelRequest, res: VercelResponse) => {
  res.send('https://github.com/EndBug/api')
}
