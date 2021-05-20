import { NowRequest, NowResponse } from '@vercel/node'
import { Octokit } from '@octokit/core'
const octokit = new Octokit({
  auth: process.env.GITHUB_SEARCH_TOKEN
})

export default async (req: NowRequest, res: NowResponse) => {
  const { action, badge, ...badgeStuff } = req.query

  if (!action || typeof action != 'string') return res.status(400)
  const useShield = badge === 'true'

  const search = await octokit
    .request('GET /search/code', {
      q: `${action.replace(
        /[\.,:;/\\`'"=*!?#$&+^|~<>(){}\[\]]/g, // eslint-disable-line no-useless-escape
        '+'
      )} path:.github/workflows/ language:YAML fork:true`
    })
    .catch()

  if (!useShield) res.send(search.data.total_count)
  else
    res.send({
      schemaVersion: 1,
      label: 'used by',
      message: `${search.data.total_count}`,
      color: '#2088FF',
      namedLogo: 'GitHub Actions',
      logoColor: 'white',
      ...badgeStuff
    })
}
