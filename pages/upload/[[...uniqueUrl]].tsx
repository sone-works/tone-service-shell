import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return new Promise<GetServerSidePropsResult<any>>(async (resolve, reject) => {
    let uniqueUrl = context.params?.uniqueUrl

    if (uniqueUrl?.length) uniqueUrl = uniqueUrl[0]

    const api = 'https://api.tone.audio/v1'

    const sessionToken = getCookie('tone.session', {
      req: context.req,
      res: context.res,
    })

    if (!sessionToken) return reject({ props: { canAccess: false } })

    return await fetch(api + '/users', {
      headers: {
        Authorization: 'BEARER ' + sessionToken,
      },
    })
      .then((response) => response.json())
      .then((data) => data.user)
      .then(async (user) => {
        if (!user) return reject({ props: { canAccess: false } })

        if (uniqueUrl) {
          return await fetch(api + '/catalog/entities/' + uniqueUrl)
            .then((response) => response.json())
            .then((data) => data.entity)
            .then((entity) => {
              return resolve({ props: { canAccess: true, user, entity } })
            })
            .catch((error) => reject({ props: { canAccess: false } }))
        }

        return resolve({
          props: { canAccess: true, user },
        })
      })
      .catch((error) => reject({ props: { canAccess: false } }))
  }).catch((error) => error)
}

export default function UploadPage() {
  return <div>Upload Page</div>
}
