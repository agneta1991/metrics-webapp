import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import DetailsPage from '../components/detailsPage';
import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const customTextMatcher = (text) => (content, element) => {
  const elementHasText = element.textContent.includes(text);
  const elementIsAriaLabel = element.getAttribute('aria-label') === text;
  return elementHasText || elementIsAriaLabel;
};

describe('DetailsPage Integration Test', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      weather: {
        weatherData: [
          {
            location: {
              country: 'FRANCE',
              name: 'Paris',
            },
          },
        ],
      },
    });
    store.dispatch = jest.fn(() => Promise.resolve());
  });

  it('renders DetailsPage component with mock data', async () => {
    render(
      <Provider store={store}>
        <Router>
          <DetailsPage />
        </Router>
      </Provider>,
    );

    await waitFor(
      async () => {
        expect(
          await screen.findByText(
            'CITY WEATHER',
            {},
            { matcher: customTextMatcher },
          ),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    const microphoneImage = screen.getByAltText('microphone--v3');
    const settingsImage = screen.getByAltText('settings--v1');
    expect(microphoneImage).toBeInTheDocument();
    expect(settingsImage).toBeInTheDocument();
  });
});
