import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from '../redux/store';
import DetailsPage from '../components/detailsPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ query: 'your-mock-query' }),
}));

const mockCityWeather = {
  location: {
    name: 'Mock City',
    country: 'Mock Country',
  },
  current: {
    observation_time: 'Mock Time',
    temperature: 'Mock Temperature',
  },
};

describe('DetailsPage', () => {
  beforeEach(() => {
    useSelector.mockClear();
  });

  it('renders DetailsPage with mock data', () => {
    useSelector.mockReturnValue(mockCityWeather);

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/your-mock-query']}>
          <Route path="/details/:query">
            <DetailsPage />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Mock City')).toBeInTheDocument();
    expect(getByText('Mock Country')).toBeInTheDocument();
    expect(getByText('Mock Time')).toBeInTheDocument();
    expect(getByText('Mock Temperature°C')).toBeInTheDocument();
  });
});
