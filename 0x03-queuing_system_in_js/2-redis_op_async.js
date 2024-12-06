import {createClient, print} from "redis";
import {promisify} from 'util';


const redisClient = createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);

const setNewSchool = (schoolName, value) => {
	redisClient.set(schoolName, value, print);
}

async function displaySchoolValue(schoolName) {
	const value = await getAsync(schoolName);
	if (value) console.log(value);
}

async function main() {
	await displaySchoolValue('ALX');
	setNewSchool('ALXSanFrancisco', '100');
	await displaySchoolValue('ALXSanFrancisco');
}

redisClient.on('error', (error) => {
  console.log(`Redis client not connected to server: ${error.message}`);
  redisClient.quit();
});

redisClient.on('connect', () => {
	console.log('Redis client connected to the server');
	main();
});
