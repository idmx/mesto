export default class Card {
  constructor(photo, userInfoId, cardTemplate, handleCardClick, likePhoto, touchTrash) {
    this._photoTitle = photo.name;
    this._photoLink = photo.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._photoLikes = photo.likes;
    this._photoId = photo._id;
    this._likePhoto = likePhoto;
    this._userInfoId = userInfoId;
    this._photoOwnerId = photo.owner._id;
    this._touchTrash = touchTrash;
    this._isLikes = false;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate)
    .content.querySelector('.element')
    .cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', this._handleCardClick);
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLike.addEventListener('click', () => this._likePhoto(this, this._photoId, this._isLikes));
    this._element.querySelector('.element__trash').addEventListener('click', () => this._touchTrash(this, this._photoId));
  }

  toggleLike(data) {
    this._elementLike.classList.toggle('element__like_active');
    this._element.querySelector('.element__likes>.element__counts').textContent = data.likes.length;
    if (this._isLikes) {
      this._isLikes = false;
    } else {
      this._isLikes = true;
    }
  } 

  removeCard() {
    this._element.remove();
    this._element = null;
  } 

  _hasMyLikes() {
    this._photoLikes.forEach(like => {
      if (like._id === this._userInfoId) {
        this._elementLike.classList.toggle('element__like_active');
        this._isLikes = true;
      }
    })
  }

  _hasMyCard() {
    if (this._photoOwnerId === this._userInfoId) {
      this._element.querySelector('.element__trash').classList.add('element__trach_active');
    }
  }

  addElement() { 
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._elementImage.src = this._photoLink;
    this._elementImage.alt = this._photoTitle;
    this._element.querySelector('.element__description>.element__title').textContent = this._photoTitle;
    this._element.querySelector('.element__description>.element__title').title = this._photoTitle;
    this._element.querySelector('.element__likes>.element__counts').textContent = this._photoLikes.length;
    this._hasMyLikes();
    this._hasMyCard();
    return this._element;
  }
}