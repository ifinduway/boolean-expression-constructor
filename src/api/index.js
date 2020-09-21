import creareAPIProvider from '@/modules/HTTPAPIController/creareAPIProvider';

import Internal from './Internal';

export default {
    Internal: creareAPIProvider('FastBet API', Internal),
};
