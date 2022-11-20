import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
    MovableCardWrapper,
    CardHeader,
    CardRightContent,
    CardTitle,
    Detail,
    Footer
} from 'react-trello/dist/styles/Base'

import Tag from './Tag'
import DeleteButton from 'react-trello/dist/widgets/DeleteButton'

class Card extends Component {
    onDelete = e => {
        this.props.onDelete()
        e.stopPropagation()
    }

    render()  {
        const {
            showDeleteButton,
            style,
            tagStyle,
            onClick,
            onDelete,
            onChange,
            className,
            id,
            title,
            label,
            description,
            parentType,
            parentId,
            dueDate,
            timeLog,
            priority,
            tags,
            cardDraggable,
            t
        } = this.props

        const updateCard = (card) => {
            onChange({...card, id})
        }

        return (
            <MovableCardWrapper
                data-id={id}
                onClick={onClick}
                style={style}
                className={className}
            >
                {/*<CardHeader>*/}
                {/*    <CardTitle draggable={cardDraggable}>*/}
                {/*        {title}*/}
                {/*    </CardTitle>*/}

                <div className={'d-flex justify-content-center mb-3'}>
                    <h4>
                        {title}
                    </h4>
                </div>
                {/*<CardRightContent>*/}
                <div className={'d-flex row'}>
                    <div className={'col-6'}>
                        <div className={'d-flex justify-content-center'}>
                            <label>
                                {/*due date :*/}
                                زمان صرف شده:
                            </label>
                        </div>

                        <div className={'d-flex justify-content-center'} style={{fontSize: '0.8rem'}}>
                            {timeLog}
                        </div>
                    </div>

                    <div className={'col-6'}>
                        <div className={'justify-content-center'}>
                            <label>
                                {/*due date :*/}
                                تاریخ اتمام:
                            </label>
                        </div>

                        <div className={'justify-content-center'} style={{fontSize: '0.8rem'}}>
                            {dueDate}
                        </div>
                    </div>
                </div>

                <div>
                    <div className={'d-flex justify-content-center mt-3 mb-2'}>
                        <label>
                            {/*priority :*/}
                            اولویت:
                        </label>
                    </div>
                    {/*<div>*/}
                    {
                        priority === "low"
                            ? <div className={'d-flex justify-content-center'}
                                   style={{
                                       backgroundColor: 'yellow',
                                       borderRadius: 20
                            }}
                            >
                                کم
                        </div>
                            : (priority === "medium" ? <div className={'d-flex justify-content-center'}
                                                            style={{
                                                                backgroundColor: 'orange',
                                                                borderRadius: 20
                            }}
                                >
                                    متوسط
                            </div>
                            : (priority === "high" ? <div className={'d-flex justify-content-center'}
                                   style={{
                                       backgroundColor: 'rgba(255, 0, 0, 0.6)',
                                       borderRadius: 20
                            }}
                                >
                                    زیاد
                            </div> : <div className={'d-flex justify-content-center'}
                                          style={{
                                              backgroundColor: 'rgba(0, 0, 255, 0.6)',
                                              borderRadius: 20
                                          }}
                                >
                                    ضروری
                                </div>))
                    }
                        {/*{priority}*/}
                    {/*</div>*/}
                </div>
                {/*</CardRightContent>*/}
                {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
                {/*</CardHeader>*/}
                <div>&nbsp;</div>
                <Detail>
                    {description}
                </Detail>
                {/*{tags && tags.length> 0 && (*/}
                {/*    <Footer>*/}
                {/*        {tags.map(tag => (*/}
                {/*            <Tag*/}
                {/*                 key={tag.title}*/}
                {/*                 {...tag} tagStyle={tagStyle}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </Footer>*/}
                {/*)}*/}
            </MovableCardWrapper>
        )
    }
}

Card.propTypes = {
    showDeleteButton: PropTypes.bool,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    tagStyle: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    timeLog: PropTypes.string,
    priority: PropTypes.string,
    parentType: PropTypes.string, // Supervisor - Personal
    parentId: PropTypes.string,
    tags: PropTypes.array,
}

Card.defaultProps = {
    showDeleteButton: true,
    onDelete: () => {},
    onClick: () => {},
    style: {width: '100%'},
    tagStyle: {},
    title: 'بدون عنوان',
    description: 'بدون توضیحات',
    priority: 'medium',
    dueDate: 'تعریف نشده',
    timeLog: 'تعریف نشده',
    label: '',
    tags: [],
    className: ''
}

export default Card;
