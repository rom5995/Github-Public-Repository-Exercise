import axios from 'axios';
import {HISTORY_API} from './config';

export default {
    getHistory: async function() {
        try {
            const response = await axios.get(HISTORY_API);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
