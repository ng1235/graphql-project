import { tags } from '../api/schema/test-data.js'

export function getTagIds(tagNames, userId, entryId) {
  let labels = tagNames.split(',')
  let tagsId = [];


  for (let i = 0; i < labels.length; i++) {
    let index = findExistingTag(labels[i], userId);

    if (index === -1) {
      let newTag = buildNewTag(labels[i], userId, entryId);
      let newTagId = newTag.id;
      tags.push(newTag);
      tagsId.push(newTagId)
    } else {
      tagsId.push(index);
    }
  }

  return tagsId
}

function findExistingTag(label, userId) {
  let index = tags.findIndex((tag) => { 
    if (tag.tagName.toLowerCase() === label.toLowerCase() && tag.userId.includes(userId)) {
      return true;
    } else {
      return false;
    }
  })

  return index;
}

function buildNewTag(tagName, userId, entryId) {
  return {
    id: tags.length + 1,
    tagName,
    userId: [userId],
    entryId: [entryId]
  }
}

