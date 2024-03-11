const axios = require('axios');
const chai = import('chai');
const config = require('./config');

const DROPBOX_ACCESS_TOKEN = config.DROPBOX_ACCESS_TOKEN;

const axiosInstanceAPI = axios.create({
  baseURL: config.DROPBOX_API_URL
});
const axiosInstanceContent = axios.create({
  baseURL: config.DROPBOX_CONTENT_URL
});

describe('Dropbox API tests suite', () => {
  it('check user', async () => {
    const checkUser = {
      query: 'foo'
    };
    const response = await axiosInstanceAPI.post(
      '/check/user',
      checkUser,
      {
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    (await chai).expect(response.data).to.have.key('result');
  });
  it('upload file', async () => {
    const contentFile =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const response = await axiosInstanceContent.post(
      '/files/upload',
      contentFile,
      {
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Dropbox-API-Arg': JSON.stringify({
            autorename: false,
            mode: 'add',
            mute: false,
            path: '/test_1/text_5.txt',
            strict_conflict: false
          }),
          'Content-Type': 'application/octet-stream'
        }
      }
    );
    (await chai).expect(response.data.name).to.equal('text_5.txt');
  });
  it('get metadata', async () => {
    const data = {
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_media_info: false,
      path: '/test_1/text_5.txt'
    };
    const response = await axiosInstanceAPI.post(
      '/files/get_metadata',
      data,
      {
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    (await chai)
      .expect(response.headers)
      .to.have.property('x-dropbox-request-id');
  });
  it('delete file', async () => {
    const data = {
      path: '/test_1/text_5.txt'
    };
    const response = await axiosInstanceAPI.post(
      '/files/delete_v2',
      data,
      {
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    (await chai).expect(response.status).to.equal(200);
  });
  it('list folder', async () => {
    const data = {
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_media_info: false,
      include_mounted_folders: true,
      include_non_downloadable_files: true,
      path: '/test_1',
      recursive: false
    };
    const response = await axiosInstanceAPI.post(
      '/files/list_folder',
      data,
      {
        headers: {
          Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    (await chai).expect(response.data.entries.length).to.equal(5);
  });
});
