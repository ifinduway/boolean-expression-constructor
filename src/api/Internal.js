import { DOMAIN } from '@/config';

export default (Endpoint, {
    GET, POST, PUT, DELETE,
}) => ({
    ORIGIN: `${DOMAIN}/api/v1`,

    Defaults: {
        singleton: true,
    },

    Routes: {
        groups: { [GET]: new Endpoint() },
        tasks: { [GET]: new Endpoint() },

        user: {
            auth: { [GET]: new Endpoint() },
            login: { [POST]: new Endpoint() },
            register: { [POST]: new Endpoint() },
            logout: { [POST]: new Endpoint() },

            presets: {
                [PUT]: new Endpoint(),
                [DELETE]: new Endpoint(),
            },
        },

        admin: {
            groups: { [POST]: new Endpoint() },
            tasks: { [POST]: new Endpoint() },
        },
    },
});
