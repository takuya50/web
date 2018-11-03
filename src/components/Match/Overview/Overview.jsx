import React from 'react';
import styled from 'styled-components';
import MatchGraph from '../../Visualizations/Graph/MatchGraph';
import TeamTable from '../TeamTable';
import AbilityBuildTable from '../AbilityBuildTable';
import AbilityDraftTable from '../AbilityDraftTable';
import mcs from '../matchColumns';
import BuildingMap from '../BuildingMap';
import Collapsible from './../../Collapsible/index';

const Styled = styled.div`
  width: 100%;
  display: flex;
  vertical-align: top;
  .graph {
    margin-left: 30px;
    width: calc(100% - 300px);
  }
  .map {
    margin: 0 auto;
  }
  @media (max-width: 850px) {
    display: block;
    .graph {
      margin-left: 0;

      width: 100%;
    }
    .map {
      width: 300px;
    }
  }
`;

const Overview = (strings, gosuUrl, gosuIcon) => {
  const { overviewColumns, abilityColumns, abilityDraftColumns } = mcs(strings);
  return ({
    name: strings.tab_overview,
    key: 'overview',
    content: match => (
      <div>
        {
          <TeamTable
            players={match.players}
            columns={overviewColumns(match)}
            heading={strings.heading_overview}
            buttonLabel={strings.gosu_default}
            buttonTo={`${gosuUrl}Overview`}
            buttonIcon={gosuIcon}
            picksBans={match.picks_bans}
            radiantTeam={match.radiant_team}
            direTeam={match.dire_team}
            summable
            hoverRowColumn
          />
      }
        {
        match.game_mode === 18 &&
        <AbilityDraftTable
          players={match.players}
          columns={abilityDraftColumns()}
          heading={strings.heading_ability_draft}
          picksBans={match.picks_bans}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          summable
        />
      }
        {
          <Collapsible name="abilityBuilds" initialMaxHeight={800}>
            <AbilityBuildTable
              players={match.players}
              columns={abilityColumns()}
              heading={strings.heading_ability_build}
              radiantTeam={match.radiant_team}
              direTeam={match.dire_team}
            />
          </Collapsible>
        }
        {
          <Styled>
            <div className="map">
              <BuildingMap match={match} />
            </div>
            {match.version && (
            <div className="graph">
              <MatchGraph match={match} type="difference" />
            </div>
          )}
          </Styled>
      }
      </div>
    ),
  });
};

export default Overview;
