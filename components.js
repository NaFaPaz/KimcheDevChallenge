import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';

const getCountries = gql`
  {
    countries {
      code
      name
      phone
      capital
      emoji
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

function SearchBar() {
  const { loading, error, data } = useQuery(getCountries);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState({});
  const [active, setActive] = useState('continent');

  const groupBy = (e) => {
    if (e.target.value === 'Language') {
      const byLanguages = _.groupBy(data.countries, 'languages[0].name');
      setGroup(byLanguages);
      setActive('language');
    } else {
      const byContinent = _.groupBy(data.countries, 'continent.name');
      setGroup(byContinent);
      setActive('continent');
    }
  };

  return (
    <div className="app">
      <h1>Country search</h1>
      <p>Find information about a country:</p>
      <input
        className="search-bar"
        placeholder="🔍 Type in a country name"
        onChange={(event) => {
          if (_.isEmpty(group) === true) {
            const byContinent = _.groupBy(data.countries, 'continent.name');
            setGroup(byContinent);
          }
          setQuery(event.target.value);
        }}
      />
      <div className="group-by">
        <h2>Group by:</h2>
        <button
          className={active === 'continent' ? 'group-btn active' : 'group-btn'}
          onClick={groupBy}
          value="Continent"
        >
          Continent
        </button>
        <button
          className={active === 'language' ? 'group-btn active' : 'group-btn'}
          onClick={groupBy}
          value="Language"
        >
          Language
        </button>
      </div>

      <ul className="country-list">
        {Object.entries(group).map(([key, value], index) => (
          <div>
            <h2 key={index}>{key}</h2>
            <Card query={query} data={value} error={error} loading={loading} />
          </div>
        ))}
      </ul>
    </div>
  );
}

function Card(props) {
  if (props.loading) return 'Loading...';
  if (props.error) return `Error! ${props.error.message}`;

  return (
    <div>
      {props.data
        .filter((country) => {
          if (props.query === '') {
            return;
          } else if (
            country.name.toLowerCase().includes(props.query.toLowerCase())
          ) {
            return country;
          }
        })
        .map((country, index) => (
          <div className="card" key={index}>
            <li>
              <span>{country.emoji}</span>
              <h2 className="country-name"> {country.name}</h2>
              <h3>
                Capital City:
                <p className="p"> {country.capital}</p>
              </h3>
              <h3>
                Country Code:
                <p className="p"> +{country.phone}</p>
              </h3>
            </li>
          </div>
        ))}
    </div>
  );
}

export { Card, SearchBar };
