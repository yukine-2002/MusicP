// export const addItemToMusic = (musicItem, musicItemToList) => {
//   const ListMusic = musicItem.songs
//     ? musicItem.songs.filter((item) => {
//         return item.id >= musicItemToList;
//       })
//     : musicItem.filter((item) => {
//         return item.id >= musicItemToList;
//       });
//   return ListMusic;
// };
export const addItemToMusic = (musicItem, musicItemToList) => {
  const ListMusic =  musicItem.songs.filter((item) => {
        return item.id == musicItemToList;
      })
    
  return ListMusic;
};

export const playChooseMusic = (musicItem,b) => {
	var arra = musicItem.songs.filter(musicItems =>  musicItems.id >= b.id );
	var arrb = musicItem.songs.filter(musicItems =>  musicItems.id  < b.id);
	var newArr = arra.concat(arrb);
	return newArr;
}

export const randomMusics = (musicItem) => {
  const shuffled = musicItem.sort(() => Math.random() - 0.5)
  return shuffled;
}

export const addListLove = (listLove,b) => {
  const existingMusic = listLove.find(
    musicItem => musicItem.id === b.id
  );
  if (existingMusic) {
    return listLove.map(musicItem =>
      musicItem.id === b.id
        ? { ...musicItem}
        : musicItem
    );
  }

  return [...listLove, { ...b}];
}
export const removeMusics = (listLove,b) => {
  return listLove.filter(item => item != b);
}
export const addPlayList = (playList,b) => {
  const existingMusic = playList.find(
    musicItem => musicItem.id === b.id
  );
  if (existingMusic) {
    return playList.map(musicItem =>
      musicItem.id === b.id
        ? { ...musicItem}
        : musicItem
    );
  }

  return [...playList, { ...b}];
}
export const addPlayListPS = (playList,b) => {
  const existingMusic = playList.find(
    musicItem => musicItem.id === b[0]
  );
  if (existingMusic) {
    return playList.map(musicItem =>
      musicItem.id === b[0]
        ? { ...musicItem,items:b[1]}
        : musicItem
    );
  }
  return [...playList, {item : {...b[1]}}];
}
