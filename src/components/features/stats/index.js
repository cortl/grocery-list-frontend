import React from 'react';
import { connect } from 'react-redux';
import { Card, Loader, Header, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchStats } from '../../../actions/stats';

export class Stats extends React.Component {

    componentDidMount() {
        this.props.fetchStats();
    }

    buildStat = (description, stat) => {
        return (
            <Card.Content>
                <Header as='h4'>{description}</Header>
                {
                    this.props.loading
                        ? <Loader active inline='centered' />
                        : <p>{stat}</p>
                }
            </Card.Content>
        );
    }

    render() {
        return (
            <>
                {
                    this.props.error && (
                        <Message negative>
                            <Message.Header>{'Oops, something went wrong'}</Message.Header>
                            <p>{this.props.error}</p>
                        </Message>
                    )
                }
                <Card fluid>
                    <Card.Content header='Your statistics' />
                    {this.buildStat('Total number of items added 🐱‍👤', this.props.totalItemsAdded)}
                </Card>
            </>
        );
    }
}

Stats.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    fetchStats: PropTypes.func,
    totalItemsAdded: PropTypes.number
};

export const mapStateToProps = state => ({
    ...state.stats
});

export default connect(mapStateToProps, { fetchStats })(Stats);
