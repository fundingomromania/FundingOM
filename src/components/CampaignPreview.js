import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { CAMPAIGN_FAVORITED, CAMPAIGN_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: CAMPAIGN_FAVORITED,
    payload: agent.Campaigns.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: CAMPAIGN_UNFAVORITED,
    payload: agent.Campaigns.unfavorite(slug)
  })
});

const CampaignPreview = props => {
  const campaign = props.campaign;
  const favoriteButtonClass = campaign.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (campaign.favorited) {
      props.unfavorite(campaign.slug);
    } else {
      props.favorite(campaign.slug);
    }
  };

  return (
    <div className="campaign-preview">
      <div className="row">
        <div className="col-md-4">
              <img src={campaign.image} className="img-fluid imgPreview" title="Campaign Image" alt="Campaign"></img>
        </div>
        <div className="col-md-6">
              <Link to={`/campaign/${campaign.slug}`} className="preview-link">
                <h1>{campaign.title}</h1>
              </Link>
          <div className="campaign-meta"> 
            <div className="row">
              <div className="info col-md-6">
                  <Link className="author" to={`/@${campaign.author.username}`}>
                    {campaign.author.username}
                  </Link>
                  <span className="date">
                    {new Date(campaign.createdAt).toDateString()}
                  </span>
              </div>
            </div>
          </div> 
          <div className="row">
            <p>{campaign.description}</p>
          </div>
          <div className="row">
            <Link to={`/campaign/${campaign.slug}`} className="preview-link">
              <span>Find out more...</span>
            </Link>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(CampaignPreview);
