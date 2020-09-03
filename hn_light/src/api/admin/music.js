import {request, usersys} from '../common'

const prev = usersys.sl
export default {
  music: {
    add(info) {
      return request('post', prev + '/admin/music/add', info)
    },
    update(info) {
      return request('post', prev + '/admin/music/update', info)
    },
    delete(musicId) {
      return request('get', prev + '/admin/music/del', {musicId})
    },
    paged(query) {
      return request('post', prev + '/admin/music/paged', query)
    },
    setPeriodStatus(info) {
      return request('post', prev + '/admin/music/periodStatus', info)
    },
    play(info) {
      return request('post', prev + '/admin/music/playMusic', info)
    },
    stop(info) {
      return request('post', prev + '/admin/music/stopMusic', info)
    },
    volumeMusic(info) {
      return request('post', prev + '/admin/music/volumeMusic', info)
    }
  },
  songbook: {
    add(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', prev + '/admin/songbook/add', data)
    },
    delete(info) {
      return request('post', prev + '/admin/songbook/del', info)
    },
    paged(query) {
      return request('post', prev + '/admin/songbook/paged', query)
    },
  },
  periodSong: {
    add(info) {
      return request('post', prev + '/admin/periodSong/add', info)
    },
    delete(info) {
      return request('post', prev + '/admin/periodSong/del', info)
    },
    paged(query) {
      return request('post', prev + '/admin/periodSong/paged', query)
    }
  }
}