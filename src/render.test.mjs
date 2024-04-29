import { shallow } from 'enzyme';
import MentalHealthForm from "./form"

describe('MyComponent', () => {
  it('should render the component content', () => {
    const wrapper = shallow(<MentalHealthForm />);
    expect(wrapper.text()).contain('Rhapsody');
  });
});
