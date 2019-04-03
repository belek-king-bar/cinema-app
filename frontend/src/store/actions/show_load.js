import axios from "axios";
import {SHOWS_URL} from "../../api-urls";
import moment from 'moment';

export const SHOW_LOAD_SUCCESS = "SHOW_LOAD_SUCCESS";


export const loadMovieShow = (movieId) => {
      const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        // вернёт только дату на 3 дня вперёд от текущей в указанном формате
      const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');

        // encodeURI закодирует строку для передачи в запросе
        // отличается от encodeURIComponent тем, что пропускает символы,
        // входящие в формат URI, в т.ч. & и =.
      const query = encodeURI(`movie_id=${movieId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
      return dispatch => {
            axios.get(`${SHOWS_URL}?${query}`).then(response => {
                console.log(response.data);
                return dispatch({type: SHOW_LOAD_SUCCESS, show: response.data});
            }).catch(error => {
                console.log(error);
                console.log(error.response);
            });
        }
};

export const loadHallShow = (hallId) => {
      const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        // вернёт только дату на 3 дня вперёд от текущей в указанном формате
      const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');

        // encodeURI закодирует строку для передачи в запросе
        // отличается от encodeURIComponent тем, что пропускает символы,
        // входящие в формат URI, в т.ч. & и =.
      const query = encodeURI(`hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
      return dispatch => {
            axios.get(`${SHOWS_URL}?${query}`).then(response => {
                console.log(response.data);
                return dispatch({type: SHOW_LOAD_SUCCESS, show: response.data});
            }).catch(error => {
                console.log(error);
                console.log(error.response);
            });
        }
};
