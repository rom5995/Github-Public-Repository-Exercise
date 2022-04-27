import axios from 'axios';
import {REPO_API} from './config';

export default {
    getRepo: async function(owner, repository) {
        try {
            const response = await axios.get(`${REPO_API}?owner=${owner}&repository=${repository}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
