/// <reference path="jasmine.d.ts" />
/// <reference path="require.d.ts" />
/// <reference path="Mocks.ts" />

describe('A generic Resource', () => {
   
   var resource: ex.Resource<any>;
   var mocker = new Mocks.Mocker();
   
   beforeEach(() => {
      
      resource = new ex.Resource<any>('a/path/to/a/resource.png', 'image/png');
      
      URL = <any>mocker.URL();
      
      spyOn(URL, 'createObjectURL').andCallThrough();
   });
   
   it('should not be loaded by default', () => {
      
      expect(resource.isLoaded()).toBe(false);
      
   });
   
   describe('with some data', () => {
      
      beforeEach(() => {               
         resource.setData('data');  
      });           
      
      it('should be loaded immediately', () => {
         expect(resource.isLoaded()).toBe(true);
      });           
      
      it('should return the processed data', () => {
         expect(resource.getData()).toBe('blob://data');
      });
      
      it('should not trigger an XHR when load is called', () => {
         
         var done = false;
         var data;
         
         runs(() => {
            resource.load().then((data) => {
               done = true;
               data = data;
            });
         });
         
         waitsFor(() => done, 'promise never resolved', 10);
         
         runs(() => {            
            expect(data).not.toBeNull();
         });
      });
      
      it('should call processData handler', () => {
         
         var spy = jasmine.createSpy('handler');
         
         resource.processData = spy;
         resource.setData('data');
         
         expect(spy).toHaveBeenCalledWith('data');
      });
      
   });
   
   
   
});