import DashboardLabelPage from '@sone-dao/tone-react-page-dashboard-label'
import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return new Promise<GetServerSidePropsResult<any>>(async (resolve, reject) => {
    const uniqueName = context.params?.uniqueName![0]

    console.log({ uniqueName })

    const api = 'https://api.tone.audio/v1'

    const sessionToken = getCookie('tone.session', {
      req: context.req,
      res: context.res,
    })

    if (!sessionToken) return reject({ props: { canAccess: false } })

    const user = await fetch(api + '/users', {
      headers: {
        Authorization: 'BEARER ' + sessionToken,
      },
    })
      .then((response) => response.json())
      .then((data) => data.user)
      .catch((error) => reject({ props: { canAccess: false } }))

    const label = await fetch(
      api + '/catalog/entities?uniqueName=' + uniqueName
    )
      .then((response) => response.json())
      .then((data) => data.entity)
      .catch((error) => reject({ props: { canAccess: false } }))

    const { userId, roles } = user
    const access = label.access

    if (!Object.keys(access).includes(userId))
      return reject({ props: { canAccess: false } })

    return resolve({
      props: { canAccess: true, label, user },
    })
  }).catch((error) => error)
}

export default DashboardLabelPage
