import React from 'react';
import { Link } from 'react-router-dom';

import { Bucket } from '../../../interfaces/interfaces';

interface Props {
  buckets: Bucket[]
}

export const BucketsTable: React.FC<Props> = ({ buckets }) => {
  return (
    <table className="table table-hover table-striped table-bordered my-4">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        {
          buckets.map((bucket, key) => (
            <tr key={key}>
              <td>
                <Link to={`/buckets/${bucket.id}`}>{bucket.name}</Link>
              </td>
              <td>{bucket.location.name}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}