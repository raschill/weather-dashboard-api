import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const city= req.body.city;
    WeatherService.getWeatherforCity(city).then((data) => {
      HistoryService.getWeatherforCity(city);
      res.json(data);
    });
  }
  // TODO: save city to search history
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities()
  .then((data) => {
    return res.json(data);
  });
  .catch((err) => {
    res.status(500).json(err);
  });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try{
    await HistoryService.removeCity(req.params['id']);
    res.status(200).json({message: `Selected city has been deleted.`});
  }
  
  catch((err) => {
    res.status(500).json(err);
  });
});

export default router;
