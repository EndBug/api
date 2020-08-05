import { NowRequest, NowResponse } from '@vercel/node'

export default (_req: NowRequest, res: NowResponse) => {
  res.send('https://github.com/EndBug/api')
}
