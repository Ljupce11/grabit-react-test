import React from 'react';
import { Form } from 'react-bootstrap';
import { getReadableFileSizeString } from '../../../../../../helpers/getReadableFileSizeString';
import { BucketObject } from '../../../../../../interfaces/interfaces';

interface Props {
  checked: number | null
  bucketObjects: BucketObject[]
  setChecked: (value: number | null) => void
}

export const BucketObjectsTable: React.FC<Props> = ({ bucketObjects, checked, setChecked }) => {
  if (bucketObjects.length > 0) {
    return (
      <table className="table table-striped table-bordered my-4">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Last Modified</th>
            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody>
          {
            bucketObjects.map((object, key) => (
              <tr key={key}>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={checked === key}
                    onChange={() => setChecked(checked === key ? null : key)} />
                </td>
                <td>{object.name}</td>
                <td>{object.last_modified.substring(0, 10)}</td>
                <td>{getReadableFileSizeString(Number(object.size))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  } else {
    return (
      <h4 className="w-100 text-center">No bucket objects found!</h4>
    )
  }
}