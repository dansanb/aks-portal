<?php

class VendorContact extends \Eloquent {
    protected $table = "vendor_contacts";
    protected $primaryKey = 'vendor_contact_id';
    protected $fillable = ['vendor_id', 'first_name', 'last_name', 'title', 'phone', 'fax', 'email', 'notes'];
}