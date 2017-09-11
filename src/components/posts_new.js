import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form' //reduxForm is very similar to connect()
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
    renderField(field) {
        // Nested Destructure: field.meta.touched 
        const { meta: { touched, error } } = field
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    // field states: pristine / touched / invalid

    // Anytime we submit, we must be thinking about Action Creators
    onSubmit(values) {
        // this === component
        // console.log(values)
        // this.props.history.push('/posts/new') // the view I am looking at
        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        // console.log(this.props)
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title for Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">Back</Link>
            </form>
        )
    }
}

function validate(values) {
    //values.name must match <Field name="name" />
    const errors = {}

    if (!values.title) { errors.title = "Please enter a title." }
    if (!values.categories) { errors.categories = "Please enter some categories." }
    if (!values.content || values.content.length < 20) { errors.content = "Content must be at least 20 characters." }

    // If errors is empty, the form is OK to submit
    return errors
}

export default reduxForm({
    validate,
    form: 'PostsNewForm' // Must be unique, could have multiple forms per view
})(
    connect(null, { createPost })(PostsNew)
)