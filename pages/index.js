import Link from 'next/link';
import Layout from '../components/layout';
import { getTeamList } from '../lib/data-firebase';


export async function getStaticProps() {
  const allTeam = await getTeamList();
  return {
    props: { allTeam }
  };
}


export default function Home({ allTeam }) {
  return (
    <Layout home>
      <div className="home-container">
        <h1>Super Bowl Contenders: Top NFL Teams to Watch</h1>
        <ul className="list-group">
          {allTeam && allTeam.map(
            ({ id, team_name }) => (
              <li key={id} className="list-group-item">
                <Link href={`/teams/${id}`} className="list-group-link">
                  {team_name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </Layout>
  );
}