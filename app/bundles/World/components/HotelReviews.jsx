import React, { PropTypes, Component } from 'react';
import { List } from 'immutable';

export default class HotelReviews extends Component {
  static propTypes = {
    rate: PropTypes.number,
    ratingPlace: PropTypes.number,
    ratingMeal: PropTypes.number,
    ratingService: PropTypes.number,
    hotelReviews: PropTypes.instanceOf(List),
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      rate,
      ratingPlace,
      ratingMeal,
      ratingService,
      hotelReviews,
    } = this.props;

    const noValue = '--';

    let reviewCommon = (
      <div className='review__common'>
        {!!rate && (<div className='review__common__item'>
          <div className='review__common__item-name -bolder'>Общий рейтинг</div>
          <div className='review__common__item-value'>
            {rate} из 10
          </div>
        </div>)}

        {!!ratingPlace && (<div className='review__common__item'>
          <div className='review__common__item-name'>Расположение</div>
          <div className='review__common__item-value'>
            {ratingPlace} из 10
          </div>
        </div>)}

        {!!ratingMeal && (<div className='review__common__item'>
          <div className='review__common__item-name'>Питание</div>
          <div className='review__common__item-value'>
            {ratingMeal} из 10
          </div>
        </div>)}

        {!!ratingService && (<div className='review__common__item'>
          <div className='review__common__item-name'>Обслуживание</div>
          <div className='review__common__item-value'>
            {ratingService} из 10
          </div>
        </div>)}
      </div>
    );

    return (
      <div className='description__reviews'>
        <div className='description__reviews__top'>
          {reviewCommon}

          <div className='review__tour-operators'>
            <div className='review__tour-operators-text'>Оценки предоставлены сервисами:</div>
            <div className='review__tour-operators-logo'>
              <svg width='294' height='49' viewBox='0 0 294 49' xmlns='http://www.w3.org/2000/svg'><g fill='none' fillRule='evenodd'><path d='M17.908 27.76c0 1.83 1.485 3.315 3.316 3.315 1.83 0 3.315-1.484 3.315-3.315 0-1.83-1.485-3.316-3.316-3.316-1.83 0-3.316 1.485-3.316 3.316' fill='#93222E'/><path d='M57.83 27.76c0 1.83 1.485 3.315 3.316 3.315 1.832 0 3.316-1.484 3.316-3.315 0-1.83-1.484-3.316-3.316-3.316-1.83 0-3.315 1.485-3.315 3.316' fill='#099D4C'/><path d='M16.423 32.56c-1.282-1.282-1.988-2.987-1.988-4.8 0-1.814.706-3.518 1.988-4.8 1.283-1.283 2.987-1.99 4.8-1.99 3.744 0 6.79 3.047 6.79 6.79s-3.046 6.788-6.79 6.788c-1.813 0-3.517-.706-4.8-1.988zm-2.12-11.722c-1.85 1.85-2.868 4.307-2.868 6.922 0 2.615 1.018 5.073 2.867 6.92 1.85 1.85 4.307 2.868 6.922 2.868 5.397 0 9.788-4.39 9.788-9.788 0-5.398-4.39-9.79-9.788-9.79-2.615 0-5.073 1.02-6.922 2.868zM56.346 32.56c-1.282-1.282-1.988-2.987-1.988-4.8 0-1.814.706-3.518 1.988-4.8 1.282-1.283 2.987-1.99 4.8-1.99 3.744 0 6.79 3.047 6.79 6.79s-3.046 6.788-6.79 6.788c-1.813 0-3.518-.706-4.8-1.988zm-2.12-11.722c-1.85 1.85-2.868 4.307-2.868 6.922 0 2.615 1.018 5.073 2.867 6.92 1.85 1.85 4.307 2.868 6.92 2.868 5.4 0 9.79-4.39 9.79-9.788 0-5.398-4.39-9.79-9.79-9.79-2.613 0-5.07 1.02-6.92 2.868z' fill='#1B1A19'/><path d='M61.146 44.132c-9.028 0-16.373-7.344-16.373-16.372 0-9.028 7.345-16.373 16.373-16.373 9.028 0 16.373 7.345 16.373 16.373 0 9.028-7.346 16.372-16.374 16.372zm-39.922 0c-9.028 0-16.373-7.344-16.373-16.372 0-9.028 7.346-16.373 16.374-16.373 9.027 0 16.372 7.345 16.372 16.373 0 9.028-7.345 16.372-16.372 16.372zM76.92 14.888c.768-2.288 1.943-4.983 3.566-6.606H67.108c-.22-.068-.452-.114-.677-.175-.726-1.14-5.702-7.56-25.59-7.56-21.826 0-25.694 7.735-25.694 7.735H1.193c1.78 1.78 3.017 4.843 3.774 7.25C2.397 18.943.85 23.17.85 27.76c0 11.233 9.14 20.372 20.374 20.372 6.227 0 11.803-2.815 15.543-7.233l4.625 6.476 3.992-6.728c3.74 4.564 9.415 7.484 15.762 7.484 11.233 0 20.373-9.14 20.373-20.372 0-4.88-1.73-9.36-4.6-12.872z' fill='#1B1A19'/><path d='M42.083 2.895c13.952 0 19.2 5.8 19.2 5.8S46.366 6.21 41.394 24.584C36.418 6.21 21.5 8.696 21.5 8.696s5.25-5.8 19.202-5.8h1.38' fill='#FAD87D'/><path d='M96.584 12.708v5.22h5.67v3.014h-5.67v11.746c0 2.7.765 4.23 2.97 4.23 1.08 0 1.71-.09 2.295-.27l.18 3.015c-.766.27-1.98.54-3.51.54-1.846 0-3.33-.63-4.276-1.665-1.08-1.216-1.53-3.15-1.53-5.716v-11.88H89.34v-3.015h3.374v-4.005l3.87-1.214M105.81 24.723c0-2.565-.046-4.77-.18-6.796h3.464l.18 4.276h.135c.99-2.926 3.42-4.77 6.074-4.77.405 0 .72.045 1.08.134v3.69c-.45-.045-.855-.09-1.395-.09-2.79 0-4.77 2.116-5.31 5.04-.09.586-.136 1.215-.136 1.89v11.61h-3.96l.045-14.984M119.714 17.927h3.96v21.78h-3.96v-21.78zm1.89-4.005c-1.485 0-2.475-1.17-2.475-2.565s1.034-2.52 2.564-2.52 2.52 1.125 2.52 2.52-.99 2.565-2.565 2.565h-.046zM133.26 30.842c0 .54.044 1.125.178 1.62.676 2.746 3.105 4.636 5.895 4.636 4.186 0 6.616-3.42 6.616-8.415 0-4.366-2.25-8.1-6.436-8.1-2.7 0-5.265 1.89-6.03 4.86-.09.54-.225 1.124-.225 1.62v3.78zm-3.96-5.804c0-2.79-.046-5.04-.18-7.11h3.554l.225 3.735h.09c1.573-2.7 4.184-4.23 7.694-4.23 5.31 0 9.27 4.455 9.27 11.07 0 7.83-4.815 11.7-9.9 11.7-2.925 0-5.4-1.26-6.705-3.42h-.09v11.835h-3.96v-23.58z' fill='#0A0B09'/><path d='M165.433 28.592c-4.32-.09-9.225.676-9.225 4.906 0 2.61 1.71 3.78 3.69 3.78 2.88 0 4.725-1.8 5.355-3.646.135-.404.18-.855.18-1.26v-3.78zm3.87 5.895c0 1.89.09 3.736.315 5.22h-3.555l-.36-2.745h-.135c-1.17 1.71-3.555 3.24-6.66 3.24-4.41 0-6.66-3.104-6.66-6.255 0-5.264 4.68-8.144 13.095-8.1v-.45c0-1.8-.495-5.084-4.95-5.04-2.07 0-4.185.585-5.715 1.62l-.9-2.655c1.8-1.125 4.455-1.89 7.2-1.89 6.705 0 8.325 4.546 8.325 8.91v8.145zM189.552 26.793c0-.54-.045-1.17-.18-1.71-.584-2.476-2.745-4.545-5.714-4.545-4.096 0-6.526 3.6-6.526 8.37 0 4.454 2.205 8.1 6.436 8.1 2.654 0 5.085-1.8 5.805-4.725.134-.54.18-1.08.18-1.71v-3.78zm3.96-19.036v26.326c0 1.935.045 4.14.18 5.625h-3.555l-.18-3.78h-.09c-1.214 2.43-3.825 4.274-7.38 4.274-5.265 0-9.36-4.455-9.36-11.07-.044-7.29 4.5-11.7 9.765-11.7 3.375 0 5.625 1.575 6.57 3.285h.09V7.757h3.96zM200.624 17.927l4.274 12.196c.72 2.025 1.305 3.824 1.755 5.624h.136c.493-1.8 1.124-3.6 1.843-5.624l4.23-12.196h4.14l-8.55 21.78h-3.78l-8.28-21.78h4.23M219.792 17.927h3.96v21.78h-3.96v-21.78zm1.89-4.005c-1.484 0-2.474-1.17-2.474-2.565s1.035-2.52 2.564-2.52c1.53 0 2.52 1.125 2.52 2.52s-.99 2.565-2.565 2.565h-.045zM228.837 35.702c1.215.72 3.286 1.53 5.265 1.53 2.835 0 4.186-1.395 4.186-3.24 0-1.89-1.125-2.925-4.005-4.005-3.96-1.44-5.806-3.554-5.806-6.165 0-3.51 2.88-6.39 7.516-6.39 2.205 0 4.14.586 5.31 1.35l-.946 2.836c-.855-.495-2.43-1.26-4.455-1.26-2.34 0-3.6 1.35-3.6 2.97 0 1.844 1.26 2.654 4.095 3.735 3.735 1.395 5.716 3.285 5.716 6.57 0 3.87-3.016 6.57-8.1 6.57-2.386 0-4.59-.63-6.12-1.53l.944-2.97M255.25 37.232c3.782 0 6.617-3.554 6.617-8.504 0-3.69-1.846-8.326-6.526-8.326-4.633 0-6.66 4.32-6.66 8.46 0 4.77 2.7 8.37 6.527 8.37h.044zm-.133 2.97c-5.85 0-10.44-4.32-10.44-11.204 0-7.29 4.815-11.565 10.8-11.565 6.254 0 10.484 4.545 10.484 11.16 0 8.1-5.624 11.61-10.798 11.61h-.045zM270.056 24.723c0-2.565-.045-4.77-.18-6.796h3.465l.18 4.276h.136c.99-2.926 3.42-4.77 6.075-4.77.406 0 .72.045 1.08.134v3.69c-.45-.045-.853-.09-1.393-.09-2.79 0-4.77 2.116-5.31 5.04-.09.586-.136 1.215-.136 1.89v11.61h-3.96l.046-14.984M287.793 19.637h.404c.51 0 .814-.263.814-.673 0-.423-.28-.645-.753-.645-.25 0-.39.013-.464.034v1.283zm-1.016-2.005c.33-.063.814-.105 1.367-.105.672 0 1.144.105 1.467.375.276.223.425.548.425.98 0 .59-.41.998-.8 1.144v.02c.315.133.49.438.605.868.14.534.276 1.145.364 1.326h-1.05c-.068-.132-.183-.514-.31-1.09-.13-.59-.324-.742-.748-.75h-.303v1.84h-1.016v-4.608z' fill='#48803D'/><path d='M284.8 20.064c0-2.007 1.633-3.64 3.64-3.64s3.64 1.633 3.64 3.64-1.633 3.64-3.64 3.64-3.64-1.633-3.64-3.64zm-1 0c0 2.558 2.082 4.64 4.64 4.64 2.56 0 4.64-2.082 4.64-4.64s-2.08-4.64-4.64-4.64c-2.558 0-4.64 2.082-4.64 4.64z' fill='#48803D'/></g></svg>
            </div>
            <div className='review__tour-operators-logo'>
              <svg width='200' height='35' viewBox='0 0 600 100' xmlns='http://www.w3.org/2000/svg'><defs><path id='a' d='M0 100h600V.212H0V100z'/></defs><g fill='none' fillRule='evenodd'><path d='M241.883.606c5.065-1.637 10.95 2.03 11.635 7.326 1.01 5.046-2.998 10.316-8.123 10.69-4.775.63-9.562-3.094-10.07-7.887-.706-4.4 2.25-8.986 6.558-10.13M181.478 2.698c2.967.018 5.94-.037 8.914 0 1.922.036 4.025.447 5.39 1.915 1.524 1.614 1.717 3.96 1.723 6.068-.024 10.493 0 20.985-.018 31.476 2.12-.133 4.998.424 6.29-1.746 3.64-5.554 7.21-11.15 10.844-16.717 6.002.012 12.01.006 18.017.006-4.787 7.167-9.622 14.3-14.432 21.448-.89 1.36-1.934 2.604-3.04 3.79 2.193 2.163 3.36 5.046 4.816 7.7 3.797 7.62 8.48 14.74 12.808 22.064-4.77-.06-9.543.11-14.312-.08-2.798-.053-5.44-1.606-6.774-4.078-3.216-5.693-6.123-11.567-9.27-17.303-.962-1.752-3.295-1.19-4.933-1.407-.02 7.627.01 15.248-.02 22.87-5.33 0-10.66-.013-15.997 0-.018-25.336 0-50.67-.005-76.005M277.372 29.857c3.535-4.08 8.618-6.726 13.997-7.24 5.704-.537 12.02.284 16.455 4.225 4.025 3.51 5.638 8.962 5.966 14.13.2 12.57-.187 25.153.2 37.718-3.125-.048-6.255.158-9.368-.115-2.2-.157-4.43-1.19-5.56-3.154-1.335-2.387-1.082-5.228-1.1-7.868-.006-7.483.036-14.97-.018-22.458-.067-2.835-.786-6.443-3.868-7.446-4.152-1.112-8.842.18-11.9 3.19-3.04 2.98-4.34 7.356-4.454 11.52-.006 8.776.006 17.556 0 26.338-5.288.006-10.576.012-15.865 0V23.7c3.838.217 7.857-.605 11.544.797 2.28.84 3.403 3.15 3.972 5.36' fill='#253764'/><g fill='#38A1CE'><path d='M407.86 31.157c7.74-7.748 19.804-10.165 30.23-7.433 4.03 1.124 8.26 3.01 10.52 6.726 2.25 3.698 1.058 8.207 1.355 12.286-3.143-.066-6.286.134-9.41-.084-2.2-.248-3.692-2.15-4.35-4.116-.485-1.5-2.147-2.012-3.495-2.41-5.595-1.325-11.96 1.075-15.03 6-2.98 4.738-3.312 11.054-1.02 16.137 2.265 5.004 7.728 7.917 13.083 8.062 6.437.338 12.425-3.203 16.722-7.754 2.183 3.663 4.412 7.295 6.588 10.964-10.83 12.57-32.158 14.028-44.378 2.707-11.452-10.34-11.75-30.265-.816-41.083M532.128 30.577c3.282-3.94 7.832-7.01 12.988-7.718 5.016-.696 10.6.18 14.504 3.625 1.79 1.5 2.925 3.578 4.152 5.53 3.67-5.16 9.543-8.757 15.89-9.27 5.65-.515 12.014.773 15.82 5.306 3.682 4.376 4.456 10.335 4.516 15.86-.012 11.597.024 23.2-.025 34.798-3.952-.26-8.164.66-11.905-.973-2.883-1.378-3.39-4.925-3.336-7.784 0-8.46.03-16.927-.006-25.388-.164-2.642-.526-6.05-3.258-7.307-3.53-1.426-7.645-.036-10.232 2.58-3.432 3.452-4.847 8.438-5.088 13.188.012 8.545-.02 17.09.023 25.643-5.093.066-10.188.012-15.277.03.006-10.794-.006-21.582.006-32.376-.06-2.683-.29-5.656-2.152-7.765-1.826-2.128-5.046-2.23-7.537-1.427-3.48 1.27-5.794 4.52-7.148 7.827-1.632 3.874-1.904 8.134-1.91 12.286.006 7.15 0 14.307.006 21.456-4.986 0-9.966 0-14.95-.006-.007-18.276-.007-36.552 0-54.834 3.89.194 8.133-.695 11.723 1.233 2.038 1.08 2.642 3.444 3.198 5.487'/></g><path d='M237.073 23.7c3.885.198 7.91-.55 11.67.688 2.81.985 4.188 4.043 4.182 6.86.042 15.816 0 31.632.018 47.448-5.24.006-10.473.006-15.713 0 .078-18.337-.115-36.66-.157-54.997M81.927 36.566c-3.348.98-6.158 3.457-7.687 6.57-3.38 7.016-2.08 17.085 5.04 21.29 5.566 3.26 13.574 1.67 17.11-3.85 3.83-6.03 3.595-14.642-.986-20.22-3.22-3.82-8.75-5.168-13.477-3.79zm-2.502-13.38c9.06-1.717 19.08.27 26.048 6.533 11.398 10.067 12.16 29.497 1.994 40.684-11 12.25-32.792 12.24-43.63-.223-10.466-11.754-8.955-32.435 3.918-41.875 3.414-2.593 7.464-4.298 11.67-5.12z' fill='#253764'/><path d='M143.56 36.53c-4.55 1.226-7.935 5.264-8.993 9.766-1.614 6.383.006 14.294 5.923 17.956 4.768 2.9 11.434 2.375 15.538-1.475 3.47-3.185 4.714-8.134 4.484-12.71-.157-4.303-1.916-8.75-5.41-11.416-3.208-2.544-7.644-3.166-11.542-2.12zm-2.998-13.278c7.96-1.547 16.675-.4 23.467 4.212 5.74 3.747 9.778 9.864 11.265 16.53 2.006 8.94.193 18.994-5.94 25.982-10.765 12.534-32.57 12.824-43.672.597-9.948-10.794-9.67-29.456.768-39.833 3.802-3.862 8.836-6.37 14.112-7.488z' fill='#253764'/><mask id='b' fill='#fff'><use xlinkHref='#a'/></mask><path d='M479.548 36.45c-3.42.87-6.376 3.307-7.983 6.438-3.173 6.303-2.532 14.915 2.744 19.92 4.81 4.61 13.307 4.32 17.882-.496 2.98-3.095 4.17-7.524 4.025-11.737-.018-4.665-1.976-9.55-5.892-12.263-3.083-2.21-7.144-2.725-10.777-1.86zm-2.465-13.343c9.042-1.59 19 .507 25.848 6.848 11.195 10.165 11.828 29.456 1.663 40.552-10.974 12.07-32.454 12.1-43.356-.078-9.93-10.983-9.465-29.918 1.37-40.13 3.948-3.797 9.103-6.25 14.476-7.193z' fill='#38A1CE' mask='url(#b)'/><path d='M341.754 37.092c-3.547 1.342-5.505 5.028-6.104 8.594-.846 4.75-.24 10.08 2.714 14.033 3.813 5.173 12.746 5.445 16.595.18 2.623-3.705 2.75-8.52 2.435-12.878-.314-3.675-1.79-7.76-5.307-9.483-3.184-1.5-7.04-1.693-10.334-.448zm-7.893-12.837c8.094-3.233 18.277-2.617 24.98 3.336.943-1.842 2.55-3.395 4.647-3.77 3.16-.538 6.382-.17 9.567-.278.012 16.862.006 33.718.006 50.58 0 6.157-1.855 12.503-6.128 17.072-5.517 6.008-13.864 8.54-21.83 8.8-7.415.12-14.897-1.65-21.4-5.252 1.25-3.064 2.23-6.262 3.8-9.186.792-1.524 2.594-2.316 4.268-2.013 2.635.478 5.125 1.59 7.802 1.928 4.69.702 10.003.605 13.955-2.35 2.998-2.284 3.917-6.267 3.705-9.863-5.023 4.212-12.02 4.937-18.27 3.802-6.267-1.15-11.942-5.072-15.285-10.487-4.526-7.222-5.41-16.276-3.717-24.513 1.536-7.64 6.51-14.868 13.9-17.805zM16.54 45.86c-1.564.993-1.824 2.98-1.866 4.68-.012 4.955.006 9.91.006 14.86 4.57-.024 9.144.037 13.72-.01 3.123-.063 6.314-1.724 7.79-4.547 2.223-4.273 1.788-10.292-2.014-13.544-3.112-2.61-7.41-2.285-11.204-2.31-2.14.092-4.527-.356-6.43.87zm-.428-29.43c-1.28 1.13-1.39 2.942-1.438 4.53-.012 4.087.012 8.167 0 12.252 3.976-.018 7.953.054 11.93-.018 2.38-.048 4.78-1.088 6.237-3.01 2.87-3.916 2.708-10.37-1.383-13.393-2.805-2.047-6.443-1.474-9.694-1.564-1.898.048-4.164-.254-5.65 1.203zm-16.1-5.724c-.26-4.268 3.632-8.117 7.862-8.008 6.45 0 12.897-.006 19.346 0 6.352.145 13.072 2.012 17.563 6.738 6.926 7.144 6.51 19.848-.63 26.7-.84.786-1.727 1.506-2.597 2.25 3.674 1.843 7.077 4.508 8.908 8.28 3.318 6.774 2.92 15.41-1.305 21.707-4.65 6.902-13.285 9.827-21.3 10.01-9.276.03-18.56 0-27.842.01-.006-22.56.006-45.12-.006-67.687z' fill='#253764' mask='url(#b)'/><path d='M385.867 61.218c5.287-1.632 11.295 2.562 11.58 8.087.55 4.858-3.367 9.645-8.263 9.97-4.83.618-9.62-3.232-10.038-8.08-.635-4.405 2.387-8.92 6.72-9.977' fill='#38A1CE'/></g></svg>
            </div>
            <div className='review__tour-operators-logo'>
              <img src='/images/tourpravda.png'/>
            </div>
          </div>
        </div>

        {hotelReviews && hotelReviews.map((review, index) => (
          <div key={index} className='review__item'>
            <span className='review__item__name'>{review.get('userName')}</span>
            <span className='review__item__location'>{review.get('cityName')}</span>
            <br/>
            <div className='review__item__short'>{review.get('shortComment')}</div>
            {review.get('positive') && (<div className='review__item__text'>
              <b>Преимущества:</b>
              <p dangerouslySetInnerHTML={{ __html: review.get('positive') }}></p>
            </div>)}
            {review.get('negative') && (<div className='review__item__text'>
              <b>Недостатки:</b>
              <p dangerouslySetInnerHTML={{ __html: review.get('negative') }}></p>
            </div>)}
            <div className='review__item__number'>
              <p>{parseInt(review.get('rate'), 10).toFixed(1)}</p>
              <span>оценка</span>
            </div>
            <time className='review__item__time'>Отзыв написан {review.get('createDate')}</time>
          </div>
        ))}
      </div>
    );
  }
}
