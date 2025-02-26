import { getData, postData } from '../utils/api';

const getTest = async () => {
  try {
    const users = await getData('/users');
    console.log('Users:', users);
  } catch (error) {
    console.error('Error:', error);
  }
};

const postTest = async () => {
  try {
    const newUser = await postData('/users', { name: 'Yunju', age: 25 });
    console.log('User added:', newUser);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 함수 실행
//getTest();
//postTest();
