import Layout from '../../components/layout';
import { getTeamIds, getTeamData } from '../../lib/data-firebase';

export async function getStaticProps({ params }) {
  const itemTeam = await getTeamData(params.id);
  return {
    props: {
      itemTeam
    }
  };
}

export async function getStaticPaths() {
  const paths = await getTeamIds();
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemTeam }) {
  return (
    <Layout>

      <article className="card col-6">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">{itemTeam.team_name}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2"><strong>Head Coach:</strong> {itemTeam.head_coach}</h6>
          <p className="card-text"><strong>Quarterback:</strong> {itemTeam.quarterback}</p>
          <h6>Playoff Rounds Wins</h6>
          <ol>
            {itemTeam.wins && itemTeam.wins.map(
                ({id, round}) => (
                  <li key={id}>
                    {round}
                  </li>
                )
              )
            }
          </ol>
          <a href={itemTeam.team_website} className="card-link" target="_blank" rel="noopener noreferrer">Visit Website</a>
        </div>
        <div className="card-footer bg-light">
          <p className="mb-0">Stay updated with the latest news and updates.</p>
        </div>

      </article>

    </Layout>

  );
}
