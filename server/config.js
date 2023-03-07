export const PORT = 5000;


export const databaseStore = {
    host: 'sql434.main-hosting.eu',
    user: 'u112784341_ainigue2',
    password: 'Blink182180',
    database: 'u112784341_PROYECTOS',
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
	// How frequently expired sessions will be cleared; milliseconds:
	checkExpirationInterval: 900000,
	// The maximum age of a valid session; milliseconds:
	expiration: 28800000,
	// Whether or not to create the sessions database table, if one does not already exist:
	createDatabaseTable: true,
	// Whether or not to end the database connection when the store is closed.
	// The default value of this option depends on whether or not a connection was passed to the constructor.
	// If a connection object is passed to the constructor, the default value for this option is false.
	endConnectionOnClose: true
}