import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function getTeamList() {
  const filePath = path.join(dataDir, 'teams.json');

  const jsonString = fs.readFileSync(filePath, 'utf8');

  const jsonObj = JSON.parse(jsonString);

  jsonObj.sort(function(a, b) {
    return a.odds_to_win - b.odds_to_win;
  });

  return jsonObj.map(
    function(item) {
      return {
        id: item.id.toString(),
        team_name: item.team_name
      };
    }
  );
}


export function getTeamIds() {
  const filePath = path.join(dataDir, 'teams.json');

  const jsonString = fs.readFileSync(filePath, 'utf8');

  const jsonObj = JSON.parse(jsonString);

  return jsonObj.map(
    function(item) {
      return {
        params: {
          id: item.id.toString()
        }
      };
    }
  );

}


export async function getTeamData(idRequested) {
  const filePath = path.join(dataDir, 'teams.json');

  const jsonString = fs.readFileSync(filePath, 'utf8');

  const jsonObj = JSON.parse(jsonString);

  const objMatch = jsonObj.filter(
    function(obj) {
      return obj.id.toString() === idRequested;
    }
  );

  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];

    const filePath2 = path.join(dataDir, 'wins.json');

    const jsonString2 = fs.readFileSync(filePath2, 'utf8');

    const jsonObj2 = JSON.parse(jsonString2);

    const objMatch2 = jsonObj2.filter(
      function(obj) {
        return obj.winner.toString() === idRequested;
      }
    );
    objReturned.wins = objMatch2;

  } else {
    objReturned = {};
  }

  return objReturned;
}

