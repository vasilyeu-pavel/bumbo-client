import React, { Component, PropTypes } from 'react';

class MainContentAbout extends Component {
    static propTypes = {

    }
    render () {
        return (
			<div className="main__content">
				<div className = "landing__content">
					<div className = "inner">
						<div className = "container">
					      	<div className = "about-header">
						      	<p className = "header-content">
						      	Bumbo.travel – это новый сервис для поиска и 
						      	покупки авиабилетов. Скорее всего, у вас сразу
						      	возник вопрос: чем же вы отличаетесь от других 
						      	подобных сервисов, и почему мы должны покупать 
						      	у вас?
						      	</p>
					      	</div>
					      	<div className = "about-content"> 
						      	<p className = "legacy-paragraph">
						      	Наше главное преимущество в том, что мы новая 
						      	компания на рынке on-line продаж авиабилетов.
						      	 Мы будем стараться изо всех сил, чтобы 
						      	 завоевать Ваше доверие и предоставить Вам 
						      	 лучший сервис.
						      	</p>
						      	<p className = "legacy-paragraph">
						      	Мы долго думали над тем, чем же мы можем 
						      	выделиться среди остальных и что мы можем дать 
						      	Вам… Тщательно изучили отзывы, рейтинги и 
						      	опасения людей, которые заказывают билеты в 
						      	интернете, и все это учли. Как оказалось, кроме 
						      	низких цен, людям очень не хватает приятного 
						      	обслуживания и чувства безопасности.
						      	</p>
						      	<p className = "legacy-paragraph">
						      	Если у Вас возникают вопросы или проблемы, мы 
						      	всегда будем с Вами и будем помогать Вам.
						      	</p>
						      	<p className = "legacy-paragraph">
						      	bumbo.travel - это не только сайт, мы развиваем 
						      	службу поддержки, подбираем сотрудников, которые 
						      	любят свою работу.
						      	</p>
					      	</div>
				      	</div>
			      	</div>
		      	</div>
			</div>
        )
    }

}

export default MainContentAbout
