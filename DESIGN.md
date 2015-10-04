# BlobMarks Design

A bookmark is stored in BlobStash as a JSON encoded blob.

```json
{
  "url": "https://github.com/tsileo/blobmarks",
  "body_ref": "c0f1480a26c2fd4deb8e738a52b7530ed111b9bcd17bbb09259ce03f129988c5",
  "created_at": "2015-09-22T10:53:22+02:00",
  "version": "1"
}
```

Data is indexed locally with [kv](https://github.com/cznic/kv) and [bleve](https://github.com/blevesearch/bleve).

